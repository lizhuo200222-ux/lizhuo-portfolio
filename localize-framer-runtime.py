import pathlib,re,urllib.request,hashlib
root=pathlib.Path('public/framer-runtime');root.mkdir(parents=True,exist_ok=True)
seeds=[pathlib.Path('public/reference-runtime.mjs'),pathlib.Path('public/reference-home.mjs')]
queue=[]
pat=re.compile(r'https://framerusercontent\.com/[^"\'`\s)]+')
for f in seeds:
 if f.exists(): queue += pat.findall(f.read_text(encoding='utf-8'))
seen=set(); mapping={}
while queue and len(seen)<500:
 u=queue.pop(0).replace('&amp;','&')
 if u in seen: continue
 seen.add(u)
 name=u.split('?',1)[0].rsplit('/',1)[-1] or hashlib.sha1(u.encode()).hexdigest()+'.mjs'
 if '.' not in name: name=hashlib.sha1(u.encode()).hexdigest()+'.mjs'
 target=root/name
 try:
  if not target.exists(): urllib.request.urlretrieve(u,target)
  mapping[u]='/framer-runtime/'+name
  txt=target.read_text(encoding='utf-8',errors='ignore')
  queue += [x for x in pat.findall(txt) if x not in seen]
 except Exception as e: print('FAIL',u,e)
for f in list(root.rglob('*'))+seeds:
 if not f.is_file(): continue
 try: s=f.read_text(encoding='utf-8')
 except: continue
 for u,p in mapping.items(): s=s.replace(u,p).replace(u.replace('&','&amp;'),p)
 f.write_text(s,encoding='utf-8')
print('modules',len(mapping),'remaining',len(queue))
