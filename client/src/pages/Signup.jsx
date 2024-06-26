import { Alert, Button, Label,Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


export default function Signup() {
  const { fromData ,setFromData } = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const  navigate = useNavigate();
  const  handleChange = (e) =>  {
    setFromData({ ...formData, [e.target.id]: e.target.value.trim()});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body : JSON.stringify(fromData),
      });
      const data = await res.json();
      if( data.success == false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    }catch(error){
      setErrorMessage(error.message);
      setLoading(false);
      }
    };

  return (
    <div className = 'min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      { /* left */}
      <div className="flex-1">
      <Link
        to='/'
        className='font-bold dark:text-white text-4xl'>
      
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          BLOGI
        </span>
        Fy
      </Link>

      <p className='text-sm mt-5'>
        👋 Welcome! Let's create your account.
      </p>
      

      </div>
      {/* right */}


      <div className="flex-1">
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your Username' />
            <TextInput type='text' placeholder='Username' id='username' onchange={handleChange}/>
          </div>
          <div>
            <Label value='Your Email' />
            <TextInput type='email' placeholder='xyx@gmail.com' id='email' onchange= {handleChange} />
          </div>

          <div>
            <Label value='Your Password' />
            <TextInput type='password' placeholder='Password' id='password'  onchange= {handleChange} />
          </div>

          <Button  gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span> Have an Account??</span>
          <Link to='/sign-in' className='text-red-500'>
            Sign in here!
          </Link>
        </div>
        {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
      </div>

      
    </div>
  </div>
  );
  
}
    
  


