const Hero = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-5 w-full ">
        <img src="/logo.png" width={200} />
        <h1 className="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
          <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
            Adamantium
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-center text-gray-700 dark:text-white md:text-xl">
          ai powered reverse engineering framework backed by rizin
        </p>

        <div className="flex flex-col  space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
          <input id="api_key" type="text" className="px-6 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring sm:mx-2" placeholder="Enter Claude API Key" />

          <button className="px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none sm:mx-2">
            Submit
          </button>
        </div>

      </div>
    </section>

  )
}

export default Hero
