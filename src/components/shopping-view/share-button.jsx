import { useState, useEffect } from "react"
import { Share2, Copy, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export function ShareButton({ product }) {
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const productImage = product?.image1 || "/placeholder.svg"
  const productPrice = product?.salePrice || product?.price

  // Create a URL with the product ID as a query parameter
  const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : ''
  const shareUrl = `${baseUrl}?productId=${product._id}`

  const shareText = `Check out ${product?.title} for ₹${productPrice} on our store!`

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const handleShare = async () => {
    const shareData = {
      title: product?.title,
      text: shareText,
      url: shareUrl,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        // Use Web Share API if available
        await navigator.share(shareData)
        toast({ title: "Shared successfully!" })
      } else {
        // Fallback to custom share dialog
        setShowShareDialog(true)
        updateMetaTags()
      }
    } catch (error) {
      console.error("Error sharing:", error)
      toast({
        title: "Could not share directly",
        description: "Opening share options dialog instead.",
      })
      setShowShareDialog(true)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${product?.title}\n` + `Price: ₹${productPrice}\n` + `Check it out: ${shareUrl}`,
      )
      setCopied(true)
      toast({ title: "Link copied to clipboard!" })

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually",
        variant: "destructive",
      })
    }
  }

  const shareToWhatsApp = () => {
    const whatsappText = encodeURIComponent(`${shareText}\n${shareUrl}`)
    window.open(`https://wa.me/?text=${whatsappText}`, "_blank")
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareToTwitter = () => {
    const twitterText = encodeURIComponent(`${shareText}\n${shareUrl}`)
    window.open(`https://twitter.com/intent/tweet?text=${twitterText}`, "_blank")
  }

  // Update meta tags for better sharing previews
  const updateMetaTags = () => {
    if (typeof document === 'undefined') return;
    
    // Create or update meta tags
    const metaTags = [
      { property: "og:title", content: product?.title },
      {
        property: "og:description",
        content: `Price: ₹${productPrice} - ${product?.description?.substring(0, 100) || "Check out this amazing product!"}`,
      },
      { property: "og:image", content: productImage },
      { property: "og:url", content: shareUrl },
      { name: "twitter:card", content: "summary_large_image" },
    ]

    metaTags.forEach(({ property, name, content }) => {
      let meta = property
        ? document.querySelector(`meta[property="${property}"]`)
        : document.querySelector(`meta[name="${name}"]`)

      if (!meta) {
        meta = document.createElement("meta")
        if (property) meta.setAttribute("property", property)
        if (name) meta.setAttribute("name", name)
        document.head.appendChild(meta)
      }

      meta.setAttribute("content", content)
    })
  }

  return (
    <>
      <Button 
        className="relative overflow-hidden group h-14 w-14 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 border-2 border-amber-300 shadow-lg transition-all duration-300 hover:scale-105" 
        onClick={handleShare}
      >
        <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        <Share2 className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
        <span className="sr-only">Share this product</span>
      </Button>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md bg-gradient-to-b from-amber-50 to-white border-amber-200">
          <DialogHeader>
            <DialogTitle className="text-amber-800 text-xl">Share this product</DialogTitle>
            <DialogDescription className="text-amber-700">
              Share this amazing product with your friends and family
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col space-y-4 py-4">
            <div className="flex items-center space-x-4 border border-amber-200 p-3 rounded-lg bg-white shadow-sm">
              <img
                src={productImage || "/placeholder.svg"}
                alt={product?.title}
                className="w-16 h-16 object-cover rounded-md border border-amber-100"
              />
              <div className="flex-1">
                <h3 className="font-medium text-amber-900 line-clamp-2">{product?.title}</h3>
                <p className="text-amber-700 font-bold">₹{productPrice}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="flex flex-col items-center p-3 h-auto border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200" 
                onClick={copyToClipboard}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 rounded-full mb-2 shadow-sm">
                  {copied ? 
                    <Check className="w-6 h-6 text-green-600" /> : 
                    <Copy className="w-6 h-6 text-amber-700" />
                  }
                </div>
                <span className="text-xs font-medium text-amber-800">{copied ? "Copied!" : "Copy"}</span>
              </Button>

              <Button 
                variant="outline" 
                className="flex flex-col items-center p-3 h-auto border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200" 
                onClick={shareToWhatsApp}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-2 shadow-sm">
                  <svg viewBox="0 0 24 24" width="24" height="24" className="text-green-600">
                    <path fill="currentColor" d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c0-5.445 4.455-9.885 9.942-9.885a9.865 9.865 0 0 1 7.022 2.91 9.788 9.788 0 0 1 2.909 6.99c-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-amber-800">WhatsApp</span>
              </Button>

              <Button 
                variant="outline" 
                className="flex flex-col items-center p-3 h-auto border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200" 
                onClick={shareToFacebook}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-2 shadow-sm">
                  <svg viewBox="0 0 24 24" width="24" height="24" className="text-blue-600">
                    <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-amber-800">Facebook</span>
              </Button>

              <Button 
                variant="outline" 
                className="flex flex-col items-center p-3 h-auto border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200" 
                onClick={shareToTwitter}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-200 rounded-full mb-2 shadow-sm">
                  <svg viewBox="0 0 24 24" width="24" height="24" className="text-sky-600">
                    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-amber-800">Twitter</span>
              </Button>
            </div>
            
            <div className="mt-4 bg-amber-50 p-3 rounded-md border border-amber-200">
              <p className="text-xs text-amber-700 mb-1 font-medium">Share link:</p>
              <div className="flex items-center gap-2">
                <div className="bg-white p-2 rounded border border-amber-200 text-amber-800 text-xs flex-1 truncate">
                  {shareUrl}
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-amber-300 bg-white hover:bg-amber-50"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowShareDialog(false)}
              className="border-amber-300 text-amber-800 hover:bg-amber-50"
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
