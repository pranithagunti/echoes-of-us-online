
// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Copy, Users, Heart, ArrowLeft, Eye } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import SlamBookForm, { SlamBookResponse } from '@/components/SlamBookForm';
// import { useToast } from '@/hooks/use-toast';

// const SlamBook = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [ownerName, setOwnerName] = useState('');
//   const [responses, setResponses] = useState<SlamBookResponse[]>([]);
//   const [showForm, setShowForm] = useState(true);
//   const [currentUrl, setCurrentUrl] = useState('');

//   useEffect(() => {
//     const storedName = localStorage.getItem('slamBookOwner');
//     if (storedName) {
//       setOwnerName(storedName);
//     } else {
//       navigate('/');
//     }

//     // Get current URL for sharing
//     setCurrentUrl(window.location.href);

//     // Load existing responses
//     const storedResponses = localStorage.getItem(`slambook_${storedName}`);
//     if (storedResponses) {
//       setResponses(JSON.parse(storedResponses));
//     }
//   }, [navigate]);

//   const handleResponseSubmit = (newResponse: SlamBookResponse) => {
//     const updatedResponses = [...responses, newResponse];
//     setResponses(updatedResponses);
    
//     // Save to localStorage
//     localStorage.setItem(`slambook_${ownerName}`, JSON.stringify(updatedResponses));
    
//     console.log('New response submitted:', newResponse);
//   };

//   const copyShareLink = () => {
//     navigator.clipboard.writeText(currentUrl);
//     toast({
//       title: "Link Copied! 🔗",
//       description: "Share this link with your friends to let them fill your slam book!",
//     });
//   };

//   const goBack = () => {
//     navigate('/');
//   };

//   const viewResponses = () => {
//     navigate('/responses');
//   };

//   if (!ownerName) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <Button 
//             onClick={goBack}
//             variant="outline" 
//             className="flex items-center gap-2 border-purple-200 hover:bg-purple-50"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Home
//           </Button>
          
//           {responses.length > 0 && (
//             <Button 
//               onClick={viewResponses}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
//             >
//               <Eye className="h-4 w-4 mr-2" />
//               View Responses ({responses.length})
//             </Button>
//           )}
//         </div>

//         {/* Share Section */}
//         <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//           <CardHeader className="text-center">
//             <div className="flex items-center justify-center mb-2">
//               <Heart className="h-6 w-6 text-purple-600 mr-2" />
//               <CardTitle className="text-2xl text-gray-800">{ownerName}'s Slam Book</CardTitle>
//               <Heart className="h-6 w-6 text-purple-600 ml-2" />
//             </div>
//             <CardDescription className="text-gray-600">
//               Share this link with your friends so they can fill out your slam book!
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="text-center space-y-4">
//             <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg border">
//               <code className="text-sm text-gray-600 flex-1 truncate">{currentUrl}</code>
//               <Button 
//                 onClick={copyShareLink}
//                 size="sm"
//                 className="bg-purple-600 hover:bg-purple-700 text-white"
//               >
//                 <Copy className="h-4 w-4 mr-1" />
//                 Copy
//               </Button>
//             </div>
            
//             <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
//               <div className="flex items-center gap-1">
//                 <Users className="h-4 w-4" />
//                 <span>{responses.length}/15 responses</span>
//               </div>
//               {responses.length < 15 && (
//                 <span className="text-green-600 font-medium">
//                   {15 - responses.length} more friends can join!
//                 </span>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Progress */}
//         {responses.length > 0 && (
//           <div className="mb-6">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm text-gray-600">Responses Collected</span>
//               <span className="text-sm font-medium text-purple-600">{responses.length}/15</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${(responses.length / 15) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         )}

//         {/* Form or Message */}
//         {responses.length >= 15 ? (
//           <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
//             <CardContent className="text-center py-12">
//               <Heart className="h-16 w-16 text-purple-600 mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">Slam Book Complete! 🎉</h3>
//               <p className="text-gray-600 mb-6">
//                 You've received responses from all 15 friends! Time to check out all the beautiful memories.
//               </p>
//               <Button 
//                 onClick={viewResponses}
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3"
//               >
//                 View All Responses ✨
//               </Button>
//             </CardContent>
//           </Card>
//         ) : (
//           <SlamBookForm ownerName={ownerName} onSubmit={handleResponseSubmit} />
//         )}

//         {/* Recent Responses Preview */}
//         {responses.length > 0 && responses.length < 15 && (
//           <Card className="mt-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <CardHeader>
//               <CardTitle className="text-lg text-gray-800">Recent Responses</CardTitle>
//               <CardDescription>Here's who has filled your slam book recently</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 {responses.slice(-3).map((response, index) => (
//                   <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
//                     <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                       <span className="text-white font-medium text-sm">
//                         {response.friendName.charAt(0).toUpperCase()}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800">{response.friendName}</p>
//                       <p className="text-sm text-gray-600">Called you: "{response.oneWord}"</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SlamBook;

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Users, Heart, ArrowLeft, Eye } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import SlamBookForm, { SlamBookResponse } from '@/components/SlamBookForm';
import { useToast } from '@/hooks/use-toast';

const SlamBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [ownerName, setOwnerName] = useState('');
  const [responses, setResponses] = useState<SlamBookResponse[]>([]);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Try getting ownerName from URL first
    const queryParams = new URLSearchParams(location.search);
    const urlOwner = queryParams.get('owner');

    if (urlOwner) {
      setOwnerName(urlOwner);
    } else {
      // Fallback to localStorage
      const storedName = localStorage.getItem('slamBookOwner');
      if (storedName) {
        setOwnerName(storedName);
      } else {
        navigate('/');
      }
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (!ownerName) return;

    // Get current URL for sharing
    setCurrentUrl(window.location.href);

    // Load existing responses
    const storedResponses = localStorage.getItem(`slambook_${ownerName}`);
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, [ownerName]);

  const handleResponseSubmit = (newResponse: SlamBookResponse) => {
    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);
    localStorage.setItem(`slambook_${ownerName}`, JSON.stringify(updatedResponses));
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: "Link Copied! 🔗",
      description: "Share this link with your friends to let them fill your slam book!",
    });
  };

  const goBack = () => {
    navigate('/');
  };

  const viewResponses = () => {
    navigate('/responses');
  };

  if (!ownerName) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button onClick={goBack} variant="outline" className="flex items-center gap-2 border-purple-200 hover:bg-purple-50">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>

          {responses.length > 0 && (
            <Button onClick={viewResponses} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
              <Eye className="h-4 w-4 mr-2" />
              View Responses ({responses.length})
            </Button>
          )}
        </div>

        {/* Share Section */}
        <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-6 w-6 text-purple-600 mr-2" />
              <CardTitle className="text-2xl text-gray-800">{ownerName}'s Slam Book</CardTitle>
              <Heart className="h-6 w-6 text-purple-600 ml-2" />
            </div>
            <CardDescription className="text-gray-600">
              Share this link with your friends so they can fill out your slam book!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg border">
              <code className="text-sm text-gray-600 flex-1 truncate">{currentUrl}</code>
              <Button onClick={copyShareLink} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{responses.length}/15 responses</span>
              </div>
              {responses.length < 15 && (
                <span className="text-green-600 font-medium">
                  {15 - responses.length} more friends can join!
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        {responses.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Responses Collected</span>
              <span className="text-sm font-medium text-purple-600">{responses.length}/15</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(responses.length / 15) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Form or Message */}
        {responses.length >= 15 ? (
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <Heart className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Slam Book Complete! 🎉</h3>
              <p className="text-gray-600 mb-6">
                You've received responses from all 15 friends! Time to check out all the beautiful memories.
              </p>
              <Button onClick={viewResponses} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3">
                View All Responses ✨
              </Button>
            </CardContent>
          </Card>
        ) : (
          <SlamBookForm ownerName={ownerName} onSubmit={handleResponseSubmit} />
        )}

        {/* Recent Responses Preview */}
        {responses.length > 0 && responses.length < 15 && (
          <Card className="mt-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Recent Responses</CardTitle>
              <CardDescription>Here's who has filled your slam book recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {responses.slice(-3).map((response, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {response.friendName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{response.friendName}</p>
                      <p className="text-sm text-gray-600">Called you: "{response.oneWord}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SlamBook;

