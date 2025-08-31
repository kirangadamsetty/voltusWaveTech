
import {useState, useEffect, useRef} from "react"
const data = Array.from({ length: 100 }, (_, i) => ({
    name: `product-${i + 1}`,
    des: `product-${i + 1} is best in the industry`,
    price: `₹ ${(i + 1) * 350}/-`
  }));
function OtpReceiver() {
  const [currentProducts, setCurrentProducts] = useState([])
  const [currentPage , setCurrentPage] = useState(1)
  const productsPerPage = 10
  const totalPages = Math.ceil(data.length/productsPerPage)
  const loadingRef = useRef(null)
  useEffect(()=>{
     const startIndex = (currentPage -1) * productsPerPage
     const endIndex = startIndex + productsPerPage
     const slicedProducts = data.slice(startIndex, endIndex)
     setCurrentProducts(prev => ([...prev, ...slicedProducts]))
  }, [currentPage])
  
  useEffect(()=>{
   const observer = new IntersectionObserver(([entry])=>{
    if(entry.isIntersecting){
        setCurrentPage(prev =>prev + 1)
    }
   },
  { threshold : 1}
)

if(loadingRef.current) observer.observe(loadingRef.current)
    return () =>{
      if(loadingRef.current) observer.unobserve(loadingRef.current)
    }
  },[])
  
  return (
    <div className="container mx-auto py-6">   {/* center container + top/bottom padding */}
      <div className="grid grid-cols-12 gap-6">
        {currentProducts.map((item, index) => (
          <div
            key={index}
            className="col-span-3 border rounded-md shadow-sm p-4 h-[300px]" 
          >
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-gray-600">{item.des}</p>
            <p className="text-green-700 font-semibold">{item.price}</p>
            <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded cursor-pointer">
              Add to cart
            </button>
          </div>
        ))}
      </div>
     {totalPages !== currentPage && <div className = "my-3" ref = {loadingRef}> 
        <h1 className = "font-bold text-[29px] text-blue-500 text-center">Loading....</h1>
      </div>}
    </div>
  );
}
export default OtpReceiver






