import React from 'react'
import BasicTab from './component/BasicTabs'

const page = () => {
  return (
    <>
    <main>


  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12 lg:col-span-4 space-y-6">
      <div className="rounded-md bg-card text-card-foreground shadow-sm">
        <div className="p-6 flex flex-col items-center">
          <div className="w-[124px] h-[124px] relative rounded-full">
            <img
              alt="avatar"
              loading="lazy"
              width={300}
              height={300}
              decoding="async"
              data-nimg={1}
              className="w-full h-full object-cover rounded-full"
              srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar-3.d19d606f.jpg&w=384&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar-3.d19d606f.jpg&w=640&q=75 2x"
              src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar-3.d19d606f.jpg&w=640&q=75"
              style={{ color: "transparent" }}
            />
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-50 inline-flex items-center justify-center text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 whitespace-nowrap disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/80 h-8 w-8 rounded-full cursor-pointer absolute bottom-0 right-0"
              htmlFor="avatar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="w-5 h-5 text-primary-foreground iconify iconify--heroicons"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </label>
            <div className="flex-1 w-full">
              <input
                className="w-full bg-background dark:border-700 px-3 file:border-0 file:bg-transparent file:text-sm file:font-medium read-only:bg-background disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 border-default-300 text-default-500 focus:outline-none focus:border-primary disabled:bg-default-200 placeholder:text-accent-foreground/50 border rounded-lg h-9 text-xs read-only:leading-9 hidden"
                id="avatar"
                type="file"
              />
            </div>
          </div>
          <div className="mt-4 text-xl font-semibold text-default-900">
          Md Hamid Ali
          </div>
          <div className="mt-1.5 text-sm font-medium text-default-500">
           Admin
          </div>
        </div>
      </div>
  
   
    </div>
    <div className="col-span-12 lg:col-span-8">
     
          <BasicTab/>
     
    </div>
  </div>
</main>

    </>
  )
}

export default page