import SellerSignin from "../../Components/Seller/SellerSignin"

SellerSignin

const SellerSigninPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-5">
      <h1 className="cursor-pointer rounded-lg px-4 py-1 text-2xl text-green-700 shadow-lg transition-all duration-300 ease-in  hover:scale-110">
      Seller Signin page
    </h1>
    <SellerSignin/>
    </div>
  )
}

export default SellerSigninPage