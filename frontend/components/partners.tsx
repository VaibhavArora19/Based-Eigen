import Image from "next/image"

export function Partners() {
  const partners = [
    { name: "Partner 1" },
    { name: "Partner 2" },
    { name: "Partner 3" },
    { name: "Partner 4" },
    { name: "Partner 5" },
    { name: "Partner 6" },
  ]

  return (
    <div className="relative py-24 bg-black/50" id="partners">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-500 mb-4">
            Trusted Partners
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Backed by Industry Leaders</h2>
          <p className="text-white/70 text-lg">
            We've partnered with the most trusted names in blockchain and finance to build a secure and reliable
            protocol.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex items-center justify-center h-24"
            >
              <Image
                src={`/placeholder.svg?height=60&width=120`}
                alt={partner.name}
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/70">
            Interested in becoming a partner?{" "}
            <span className="text-purple-500 hover:underline cursor-pointer">Contact us</span>
          </p>
        </div>
      </div>
    </div>
  )
}
