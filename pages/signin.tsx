import { useState } from "react";
import { useRouter } from "next/router";
import localforage from "localforage";
import { toast } from "react-hot-toast";
import { FaRegEyeSlash,FaRegEye } from "react-icons/fa";
import Link from "next/link";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

const handleSignin = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token); 
    console.log("Token saved:", data.token);
    toast.success("Signin successful!");
// Save token
    router.push("/");
  } else {
    toast.error(data.message || "Signin failed" );
  }
};


  return (
     <div className="flex flex-col items-center  p-4">
       <div className="bg-blue-700 p-2 h-3 w-3 text-white rounded-full"/>
        <h1 className="text-3xl font-bold mb-10">
          <Link href="/">Tudu</Link>
        </h1>
   
      <section className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-medium mb-8">Login to your account</h2>
      <form onSubmit={handleSignin} className="flex flex-col gap-4 w-[300px]">
         
         
         <div className="flex flex-col mb-1">
          <label htmlFor="fullname" className="mb-2 text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        </div>
        <div className="flex flex-col mb-1 ">
          <label htmlFor="password" className="mb-2 text-gray-600">Password</label>
        
        <div className="flex items-center justify-between border p-2 rounded">
          <input
        type={showPassword ? "text" : "password"}  // toggle type
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none"
          required
        />
                
                <span 
                    onClick={() => setShowPassword((prev) => !prev)}

                className="">{showPassword ? <FaRegEye/> : <FaRegEyeSlash/>}</span>
</div>
        </div>
        
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Signin
        </button>
        <p className="text-center">Don&apos;t have an account?{" "} 
          <Link href="/signup" className="text-blue-600 my-2">
            Sign up
        </Link>
        </p>
      </form>


      </section>
    </div>

  );
};

export default Signin;
