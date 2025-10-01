import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaRegEyeSlash,FaRegEye } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName,email, password }),
    });
  const data = await res.json();

    if (res.ok) {

  toast.success("Signup successful!");
      router.push("/")
    } else {
    toast.error(data.message || "Signup failed" );
    }
  };

  return (
    <div className="flex flex-col items-center  p-4">
       <div className="bg-blue-700 p-2 h-3 w-3 text-white rounded-full"/>
        <h1 className="text-3xl font-bold mb-10">
          <Link href="/">Tudu</Link>
        </h1>
   
      <section className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-medium mb-4">Create a new account</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-[300px]">
         <div className="flex flex-col mb-1">
          <label htmlFor="fullname" className="mb-2 text-gray-600">Full Name</label>
          <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        </div>
         
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
          Sign Up
        </button>
        <p className="text-center">Already have an account?{" "} 
          <Link href="/signin" className="text-blue-600 my-2">
            Sign in
        </Link>
        </p>
      </form>


      </section>
    </div>
  );
};

export default Signup;
