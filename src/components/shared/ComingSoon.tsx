import { Button } from "../ui/button";

export default function ComingSoonView() {
  return (
    <div className="flex ">
      <div className=" p-8">
        <h1 className="text-3xl text-black/95 tracking-tight font-bold mb-2">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-700 pb-4">
          We're working on something exciting. Stay tuned!
        </p>
        <div className="relative backdrop-blur-sm bg-white/10 rounded-lg ">
          <div className="space-y-4 filter blur-sm">
            <h2 className="text-2xl font-bold">Welcome to Our Website</h2>
            <p className="text-lg">
              We're working hard to bring you something amazing.
            </p>
            <div className="w-full h-4 bg-gray-700 rounded-full">
              <div className="w-2/3 h-full bg-gray-300 rounded-full"></div>
            </div>
            <p>Launch progress: 66%</p>
          </div>

          <div className="space-y-4 filter blur-sm">
            <h2 className="text-2xl font-bold"></h2>
            <p className="text-lg">
              We're working hard to bring you something amazing.
            </p>
            <div className="w-full h-4 bg-gray-700 rounded-full">
              <div className="w-2/3 h-full bg-gray-300 rounded-full"></div>
            </div>
            <p>Launch progress: 66%</p>
          </div>
        </div>
        {/* <Button variant="ghost" className="w-full rounded-lg border mt-10">
          <a href="/" className="flex items-center">
            Go Back Home
          </a>
        </Button> */}
      </div>
    </div>
  );
}
