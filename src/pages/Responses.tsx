
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Download, Share2, Sparkles, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SlamBookResponse } from '@/components/SlamBookForm';
import { useToast } from '@/hooks/use-toast';

const Responses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ownerName, setOwnerName] = useState('');
  const [responses, setResponses] = useState<SlamBookResponse[]>([]);

  useEffect(() => {
    const storedName = localStorage.getItem('slamBookOwner');
    if (storedName) {
      setOwnerName(storedName);
      
      // Load responses
      const storedResponses = localStorage.getItem(`slambook_${storedName}`);
      if (storedResponses) {
        setResponses(JSON.parse(storedResponses));
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const goBack = () => {
    navigate('/slambook');
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: `${ownerName}'s Slam Book Results`,
        text: `Check out what friends said about ${ownerName} in their digital slam book!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied! 🔗",
        description: "Share your slam book results with others!",
      });
    }
  };

  const getColorEmoji = (color: string) => {
    const colorEmojis: { [key: string]: string } = {
      'Red': '❤️', 'Blue': '💙', 'Green': '💚', 'Yellow': '💛',
      'Purple': '💜', 'Pink': '🩷', 'Orange': '🧡', 'Black': '🖤',
      'White': '🤍', 'Gray': '🩶', 'Brown': '🤎', 'Turquoise': '💎',
      'Lavender': '💜', 'Gold': '💛'
    };
    return colorEmojis[color] || '🎨';
  };

  if (!ownerName || responses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Responses Yet</h3>
            <p className="text-gray-600 mb-6">
              Your slam book is waiting for friends to fill it out!
            </p>
            <Button onClick={goBack} className="bg-purple-600 hover:bg-purple-700 text-white">
              Back to Slam Book
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={goBack}
            variant="outline" 
            className="flex items-center gap-2 border-purple-200 hover:bg-purple-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Slam Book
          </Button>
          
          <Button 
            onClick={shareResults}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {ownerName}'s Slam Book Results
            </h1>
            <Sparkles className="h-8 w-8 text-pink-600 ml-3" />
          </div>
          <p className="text-xl text-gray-600">
            Here's what your {responses.length} amazing friends said about you! 💜
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
            <CardContent className="py-6">
              <div className="text-2xl font-bold text-purple-600">{responses.length}</div>
              <div className="text-sm text-gray-600">Friends Responded</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
            <CardContent className="py-6">
              <div className="text-2xl font-bold text-pink-600">
                {responses.filter(r => r.colorThatSuits).length}
              </div>
              <div className="text-sm text-gray-600">Colors Chosen</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
            <CardContent className="py-6">
              <div className="text-2xl font-bold text-indigo-600">
                {responses.filter(r => r.secret.trim()).length}
              </div>
              <div className="text-sm text-gray-600">Secrets Shared</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
            <CardContent className="py-6">
              <div className="text-2xl font-bold text-emerald-600">
                {responses.filter(r => r.bestMemory.trim()).length}
              </div>
              <div className="text-sm text-gray-600">Memories Shared</div>
            </CardContent>
          </Card>
        </div>

        {/* Responses */}
        <div className="space-y-6">
          {responses.map((response, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {response.friendName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {response.friendName}
                    {response.nickname && (
                      <Badge variant="secondary" className="ml-2">
                        Calls you: {response.nickname}
                      </Badge>
                    )}
                  </CardTitle>
                  {response.colorThatSuits && (
                    <div className="flex items-center gap-2 bg-white/70 px-3 py-1 rounded-full">
                      <span>{getColorEmoji(response.colorThatSuits)}</span>
                      <span className="text-sm font-medium">{response.colorThatSuits}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                {/* One Word - Featured */}
                {response.oneWord && (
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-400">
                    <Quote className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-700">"{response.oneWord}"</p>
                    <p className="text-sm text-gray-600 mt-1">One word that describes you</p>
                  </div>
                )}

                {/* Best Memory */}
                {response.bestMemory && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      Best Memory Together
                    </h4>
                    <p className="text-gray-700 bg-red-50 p-3 rounded-lg border-l-4 border-red-200">
                      {response.bestMemory}
                    </p>
                  </div>
                )}

                {/* What They Like */}
                {response.whatILike && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      What They Like About You
                    </h4>
                    <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-200">
                      {response.whatILike}
                    </p>
                  </div>
                )}

                {/* Secret */}
                {response.secret && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">🤫 Secret About You</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border-l-4 border-gray-300 italic">
                      {response.secret}
                    </p>
                  </div>
                )}

                {/* Grid of shorter responses */}
                <div className="grid md:grid-cols-2 gap-4">
                  {response.opinion && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">💭 Honest Opinion</h4>
                      <p className="text-gray-700 bg-blue-50 p-3 rounded-lg text-sm">
                        {response.opinion}
                      </p>
                    </div>
                  )}

                  {response.firstImpression && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">👀 First Impression</h4>
                      <p className="text-gray-700 bg-green-50 p-3 rounded-lg text-sm">
                        {response.firstImpression}
                      </p>
                    </div>
                  )}

                  {response.wouldChange && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">🔄 Would Change</h4>
                      <p className="text-gray-700 bg-orange-50 p-3 rounded-lg text-sm">
                        {response.wouldChange}
                      </p>
                    </div>
                  )}

                  {response.superpower && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">⚡ Your Superpower</h4>
                      <p className="text-gray-700 bg-purple-50 p-3 rounded-lg text-sm">
                        {response.superpower}
                      </p>
                    </div>
                  )}

                  {response.movieCharacter && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">🎬 Movie Character</h4>
                      <p className="text-gray-700 bg-pink-50 p-3 rounded-lg text-sm">
                        {response.movieCharacter}
                      </p>
                    </div>
                  )}

                  {response.song && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">🎵 Your Song</h4>
                      <p className="text-gray-700 bg-indigo-50 p-3 rounded-lg text-sm">
                        {response.song}
                      </p>
                    </div>
                  )}
                </div>

                {/* Advice & Future Wish */}
                {response.advice && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      💡 Advice for You
                    </h4>
                    <p className="text-gray-700 bg-emerald-50 p-3 rounded-lg border-l-4 border-emerald-200">
                      {response.advice}
                    </p>
                  </div>
                )}

                {response.futureWish && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      🌟 Future Wish
                    </h4>
                    <p className="text-gray-700 bg-violet-50 p-3 rounded-lg border-l-4 border-violet-200">
                      {response.futureWish}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
          <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            You are loved! 💜
          </h3>
          <p className="text-gray-600">
            Look how much your friends care about you. These memories will last forever! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Responses;
