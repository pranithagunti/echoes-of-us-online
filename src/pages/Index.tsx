
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Users, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreateBook = () => {
    if (name.trim()) {
      // Store the name and navigate to the slam book
      localStorage.setItem('slamBookOwner', name);
      navigate('/slambook');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Echoes of US
            </h1>
            <Sparkles className="h-8 w-8 text-pink-500 ml-3 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create beautiful digital slam books and let your friends fill them with memories, 
            secrets, and heartfelt thoughts - even when you're miles apart! ✨
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-purple-700">Heartfelt Memories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Collect beautiful memories, inside jokes, and special moments your friends cherish about you
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-indigo-700">Connect Anywhere</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Share your slam book link with up to 15 friends - distance doesn't matter anymore!
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-pink-700">Fun Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Dramatic, fun, and meaningful questions that reveal what your friends really think!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Create Slam Book Section */}
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">Create Your Slam Book</CardTitle>
              <CardDescription>
                Start collecting memories from your friends today!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your beautiful name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-purple-200 focus:border-purple-400 transition-colors"
                />
              </div>
              <Button 
                onClick={handleCreateBook}
                disabled={!name.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create My Slam Book ✨
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>Made with 💜 for creating beautiful memories</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
