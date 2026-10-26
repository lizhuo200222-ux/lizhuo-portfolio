import re, pathlib, urllib.request, hashlib, json
from concurrent.futures import ThreadPoolExecutor, as_completed
root=pathlib.Path('.')
files=[root/'index.html',root/'public/portfolio-personalize.js',root/'public/reference-runtime.mjs',root/'public/reference-home.mjs']
urls=set()
pat=re.compile(r'https://framerusercontent\.com/(?:images|assets)/[^"\'` )<>]+')
for f in files:
    if f.exists(): urls.update(m.group(0).replace('&amp;','&') for m in pat.finditer(f.read_text(encoding='utf-8')))
out=root/'public/framer-assets'; out.mkdir(parents=True,exist_ok=True)

def one(url):
    path=url.split('?',1)[0]; name=path.rsplit('/',1)[-1] or hashlib.sha1(url.encode()).hexdigest()
    if '.' not in name: name=hashlib.sha1(url.encode()).hexdigest()+'.bin'
    target=out/name
    if not target.exists():
        try:
            urllib.request.urlretrieve(url,target)
        except Exception as e:
            return url,None,str(e)
    return url,'/framer-assets/'+name,None
mapping={}; failed=[]
with ThreadPoolExecutor(max_workers=8) as ex:
    for fut in as_completed([ex.submit(one,u) for u in sorted(urls)]):
        u,p,e=fut.result()
        if p: mapping[u]=p
        else: failed.append((u,e))
for f in files:
    if not f.exists(): continue
    s=f.read_text(encoding='utf-8')
    for u,p in mapping.items(): s=s.replace(u,p).replace(u.replace('&','&amp;'),p)
    f.write_text(s,encoding='utf-8')
(root/'framer-assets-map.json').write_text(json.dumps({'downloaded':len(mapping),'failed':failed},ensure_ascii=False,indent=2),encoding='utf-8')
print('downloaded',len(mapping),'failed',len(failed))
for u,e in failed[:10]: print('FAIL',u,e)
