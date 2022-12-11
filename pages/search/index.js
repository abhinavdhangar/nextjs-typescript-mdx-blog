
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
  // const [clickedCategory,setClickedCategory] = React.useState("")
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
    // setClickedCategory("")
    //console.log(searchWord);
    let result = await getBlogSearch(0,searchWord);
    //console.log('result is ...');
    //console.log(result);
    setPosts(result.posts)
  };

  const clickToCategory = async (category) => {
    // setClickedCategory(category)
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
let categoryBtn =  `cursor-pointer text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:border-indigo-300 px-2 py-1 text-sm 5xl:text-xl  inline-flex items-center border border-transparent leading-6 font-medium rounded-md focus:outline-none  focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition ease-in-out duration-150  mt-2 mr-1 filter-category-btn`
let inputContainer = `w-full show-search-overlay pl-10 block w-full py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`

  return (
    <div>
      <Layout />
      <div className='flex flex-col gap-4 items-center justify-center'>
        <form className='w-[70vw] md:w-[40vw]'>
          <input
 className={inputContainer}            onChange={(e) => changeSearchWord(e)}
            value={searchWord}
            placeholder="Search here"
     
          />
          <button className='hidden ml-3 bg-blue-300 px-3 py-2 rounded-md' type="submit" onClick={searchFunction}>
            Search
          </button>
        </form>
      <div className="flex justify-center items-center flex-wrap mb-6">
        {category.map((single, i) => (
          <span
          className={categoryBtn}
            key={i}
            onClick={(e) => {
              clickToCategory(e.currentTarget.innerText);
            }}
          >
            {' '}
            {single}{' '}
          </span>
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
