
import React from 'react';
import Layout from '../../components/Layout';
import {
  getBlogSearch,
  getCategories,
  getPostsByCategories,
} from '../../services';
import CardSlug from '../../components/card_one/CardSlug';
export default function Search() {
  const [searchWord, setSearchWord] = React.useState('');
  const [category, setCategory] = React.useState([]);
  // const [pagination, setPagination] = React.useState(0);
  const [posts, setPosts] = React.useState([]);
  const [clickedCategory,setClickedCategory] = React.useState("")
  React.useEffect(() => {
    async function run() {
      let result = await getCategories();

      let categoryArray = [];
      result.categories.map((single) => {
        categoryArray.push(single.name);
      });

      setCategory(categoryArray);
    }
    run();
  }, []);

  const changeSearchWord = async (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };
  const searchFunction = async (e) => {
    e.preventDefault();
    setClickedCategory("")
    //console.log(searchWord);
    let result = await getBlogSearch(0,searchWord);
    //console.log('result is ...');
    //console.log(result);
    setPosts(result.posts)
  };

  const clickToCategory = async (category) => {
    setClickedCategory(category)
    let postData= await getPostsByCategories(0, category);
    // //console.log(postData.categories[0].posts);
    setPosts(postData.categories[0].posts)
  };

//   const fetchSearchData = async () =>{
    
//     let dd = posts
//     setPagination(()=>pagination+1)
    
//   }
//  const fetchCategoryData = async()=>{
//    let dd = posts 
//    setPagination(()=>pagination+1)
// let postData = await getPostsByCategories(pagination,clickedCategory)
// //console.log(postData)

//  }

  return (
    <div>
      <Layout />
      <div className='flex flex-col gap-4 items-center justify-center'>
        <form>
          <input
             className=' border-2 border-black dark:border-white px-4 py-3 focus:border-blue-300 rounded-md '
            onChange={(e) => changeSearchWord(e)}
            value={searchWord}
            placeholder="Search here"
     
          />
          <button className=' ml-3 bg-blue-300 px-3 py-2 rounded-md' type="submit" onClick={searchFunction}>
            Search
          </button>
        </form>
      <div className="gap-2 flex">
        {category.map((single, i) => (
          <button
            className="bg-blue-200 font-semibold rounded-md px-2 py-1"
            key={i}
            onClick={(e) => {
              clickToCategory(e.currentTarget.innerText);
            }}
          >
            {' '}
            {single}{' '}
          </button>
        ))}
      </div>
      </div>
     {!posts.length>0  && <p>Search Results will show here...</p>}
      
      
      <div className='grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts.map((post,i)=>(
            <CardSlug
              key={i}
              title={post.title}
              slug={post.slug}
              description={post.excerpt.html}
              img={
                post.image && typeof post.image.url == 'string'
                  ? post.image.url
                  : post.image && post.image.url.url
              }
              date={post.createdAt}
            />
        ))}
        
      </div>
    </div>
  );
}
