const aiImageModules = import.meta.glob('./assets/ai-people-gallery/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
});

const peoplePriority = [
  '001-item-293865.jpg',
  '001-item-293875.jpg',
  '001-item-293895.jpg',
  '001-item-293912.jpg',
  '001-item-293946.jpg',
  '002-item-293863.jpg',
  '002-item-293877.jpg',
  '002-item-293899.jpg',
  '002-item-293915.jpg',
  '002-item-293947.jpg',
  '003-item-293861.jpg',
  '003-item-293882.jpg',
  '003-item-293901.jpg',
  '003-item-293921.jpg',
  '003-item-293954.jpg',
  '004-item-293790.jpg',
  '004-item-293868.jpg',
  '004-item-293880.jpg',
  '004-item-293896.jpg',
  '004-item-293913.jpg',
  '004-item-293949.jpg',
  '005-item-293860.jpg',
  '005-item-293878.jpg',
  '005-item-293892.jpg',
  '005-item-293919.jpg',
  '005-item-293952.jpg',
  '006-item-293862.jpg',
  '006-item-293883.jpg',
  '006-item-293893.jpg',
  '006-item-293920.jpg',
  '006-item-293948.jpg',
  '007-item-293866.jpg',
  '007-item-293879.jpg',
  '007-item-293894.jpg',
  '007-item-293916.jpg',
  '007-item-293950.jpg',
  '008-item-293869.jpg',
  '008-item-293884.jpg',
  '008-item-293900.jpg',
  '008-item-293917.jpg',
  '008-item-293951.jpg',
  '009-item-293867.jpg',
  '009-item-293881.jpg',
  '009-item-293898.jpg',
  '009-item-293914.jpg',
  '009-item-293953.jpg',
  '010-item-293864.jpg',
  '010-item-293897.jpg',
];

const peopleRank = new Map(peoplePriority.map((filename, index) => [filename, index]));

const sortedImages = Object.entries(aiImageModules)
  .map(([path, image]) => ({ filename: path.split('/').pop(), image }))
  .sort((left, right) => {
    const leftRank = peopleRank.has(left.filename) ? peopleRank.get(left.filename) : Number.MAX_SAFE_INTEGER;
    const rightRank = peopleRank.has(right.filename) ? peopleRank.get(right.filename) : Number.MAX_SAFE_INTEGER;
    return leftRank - rightRank || left.filename.localeCompare(right.filename);
  });

export const aiPeopleGalleryItems = sortedImages.map((item, index) => {
  const isPeopleScene = peopleRank.has(item.filename);
  const prefix = isPeopleScene ? '真实人物商业场景' : 'AI 商品与环境探索';
  return {
    image: item.image,
    title: `${prefix} ${String(index + 1).padStart(2, '0')}`,
    alt: `${prefix}，作品 ${String(index + 1).padStart(2, '0')}`,
    category: isPeopleScene ? 'people' : 'exploration',
  };
});

export const aiPeopleGalleryStats = {
  total: sortedImages.length,
  people: peoplePriority.length,
  exactDuplicates: 0,
};
