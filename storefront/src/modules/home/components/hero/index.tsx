import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div 
      className="h-[75vh] w-full border-b border-ui-border-base relative"
      
      // Option 2: Using a background image (currently active)
      style={{ backgroundImage: "url('/hero-background.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      
      // Option 3: Using a solid color (uncomment to use)
      // style={{ backgroundColor: "#3b82f6" }}
    >
      {/* <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-white font-normal"
          >
            Well done! You have successfully deployed your Medusa 2.0 store on Railway!
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-white font-normal"
          >
            Need help customizing your store?
          </Heading>
        </span>
        <a
          href="https://funkyton.com/medusajs-2-0-is-finally-here/"
          target="_blank"
        >
          <h1 style={{ textDecoration: "underline", color: "white" }}>
            Visit the tutorial
          </h1>
        </a>
      </div> */}
    </div>
  )
}

export default Hero
