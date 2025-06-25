
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Send, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SlamBookFormProps {
  ownerName: string;
  onSubmit: (responses: SlamBookResponse) => void;
}

export interface SlamBookResponse {
  friendName: string;
  nickname: string;
  bestMemory: string;
  whatILike: string;
  colorThatSuits: string;
  oneWord: string;
  secret: string;
  opinion: string;
  firstImpression: string;
  wouldChange: string;
  superpower: string;
  movieCharacter: string;
  song: string;
  advice: string;
  futureWish: string;
}

const SlamBookForm: React.FC<SlamBookFormProps> = ({ ownerName, onSubmit }) => {
  const { toast } = useToast();
  const [responses, setResponses] = useState<SlamBookResponse>({
    friendName: '',
    nickname: '',
    bestMemory: '',
    whatILike: '',
    colorThatSuits: '',
    oneWord: '',
    secret: '',
    opinion: '',
    firstImpression: '',
    wouldChange: '',
    superpower: '',
    movieCharacter: '',
    song: '',
    advice: '',
    futureWish: ''
  });

  const handleInputChange = (field: keyof SlamBookResponse, value: string) => {
    setResponses(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if required fields are filled
    if (!responses.friendName || !responses.bestMemory || !responses.oneWord) {
      toast({
        title: "Oops! 💭",
        description: "Please fill in at least your name, a memory, and one word about them!",
        variant: "destructive"
      });
      return;
    }

    onSubmit(responses);
    toast({
      title: "Submitted! ✨",
      description: "Your beautiful responses have been saved!",
    });

    // Reset form
    setResponses({
      friendName: '',
      nickname: '',
      bestMemory: '',
      whatILike: '',
      colorThatSuits: '',
      oneWord: '',
      secret: '',
      opinion: '',
      firstImpression: '',
      wouldChange: '',
      superpower: '',
      movieCharacter: '',
      song: '',
      advice: '',
      futureWish: ''
    });
  };

  const colors = [
    'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Orange', 
    'Black', 'White', 'Gray', 'Brown', 'Turquoise', 'Lavender', 'Gold'
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <div className="flex items-center justify-center mb-2">
            <Heart className="h-6 w-6 mr-2" />
            <CardTitle className="text-2xl">Fill {ownerName}'s Slam Book</CardTitle>
            <Sparkles className="h-6 w-6 ml-2" />
          </div>
          <CardDescription className="text-purple-100">
            Share your thoughts, memories, and feelings about {ownerName}! 💜
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="friendName" className="text-gray-700 font-medium">Your Name *</Label>
                <Input
                  id="friendName"
                  placeholder="Your beautiful name..."
                  value={responses.friendName}
                  onChange={(e) => handleInputChange('friendName', e.target.value)}
                  className="border-2 border-purple-200 focus:border-purple-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nickname" className="text-gray-700 font-medium">Nickname for {ownerName}</Label>
                <Input
                  id="nickname"
                  placeholder="What do you call them?"
                  value={responses.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  className="border-2 border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>

            {/* Memory Questions */}
            <div className="space-y-2">
              <Label htmlFor="bestMemory" className="text-gray-700 font-medium">Best Memory with {ownerName} *</Label>
              <Textarea
                id="bestMemory"
                placeholder="Share your most cherished memory together..."
                value={responses.bestMemory}
                onChange={(e) => handleInputChange('bestMemory', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-400 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatILike" className="text-gray-700 font-medium">What I Like Most About {ownerName}</Label>
              <Textarea
                id="whatILike"
                placeholder="What makes them special to you?"
                value={responses.whatILike}
                onChange={(e) => handleInputChange('whatILike', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-400"
              />
            </div>

            {/* Fun Questions */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="colorThatSuits" className="text-gray-700 font-medium">Color That Suits {ownerName}</Label>
                <Select onValueChange={(value) => handleInputChange('colorThatSuits', value)}>
                  <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400">
                    <SelectValue placeholder="Pick a color..." />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map(color => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="oneWord" className="text-gray-700 font-medium">One Word for {ownerName} *</Label>
                <Input
                  id="oneWord"
                  placeholder="Describe them in one word..."
                  value={responses.oneWord}
                  onChange={(e) => handleInputChange('oneWord', e.target.value)}
                  className="border-2 border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>

            {/* Dramatic Questions */}
            <div className="space-y-2">
              <Label htmlFor="secret" className="text-gray-700 font-medium">A Secret About {ownerName} (That Everyone Should Know!)</Label>
              <Textarea
                id="secret"
                placeholder="Spill the tea... (in a nice way!) ☕"
                value={responses.secret}
                onChange={(e) => handleInputChange('secret', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="opinion" className="text-gray-700 font-medium">Honest Opinion About {ownerName}</Label>
              <Textarea
                id="opinion"
                placeholder="Be honest but kind..."
                value={responses.opinion}
                onChange={(e) => handleInputChange('opinion', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstImpression" className="text-gray-700 font-medium">First Impression vs Now</Label>
              <Textarea
                id="firstImpression"
                placeholder="How did your opinion change from when you first met?"
                value={responses.firstImpression}
                onChange={(e) => handleInputChange('firstImpression', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wouldChange" className="text-gray-700 font-medium">One Thing You'd Change About {ownerName}</Label>
              <Input
                id="wouldChange"
                placeholder="Be gentle! 😅"
                value={responses.wouldChange}
                onChange={(e) => handleInputChange('wouldChange', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-400"
              />
            </div>

            {/* Creative Questions */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="superpower" className="text-gray-700 font-medium">If {ownerName} Had a Superpower</Label>
                <Input
                  id="superpower"
                  placeholder="What would it be?"
                  value={responses.superpower}
                  onChange={(e) => handleInputChange('superpower', e.target.value)}
                  className="border-2 border-purple-200 focus:border-purple-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="movieCharacter" className="text-gray-700 font-medium">{ownerName} as a Movie Character</Label>
                <Input
                  id="movieCharacter"
                  placeholder="Which character are they like?"
                  value={responses.movieCharacter}
                  onChange={(e) => handleInputChange('movieCharacter', e.target.value)}
                  className="border-2 border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="song" className="text-gray-700 font-medium">Song That Reminds You of {ownerName}</Label>
              <Input
                id="song"
                placeholder="🎵 Name that song!"
                value={responses.song}
                onChange={(e) => handleInputChange('song', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-400"
              />
            </div>

            {/* Heartfelt Questions */}
            <div className="space-y-2">
              <Label htmlFor="advice" className="text-gray-700 font-medium">Advice for {ownerName}</Label>
              <Textarea
                id="advice"
                placeholder="What wisdom would you share with them?"
                value={responses.advice}
                onChange={(e) => handleInputChange('advice', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="futureWish" className="text-gray-700 font-medium">Future Wish for {ownerName}</Label>
              <Textarea
                id="futureWish"
                placeholder="What do you hope for their future?"
                value={responses.futureWish}
                onChange={(e) => handleInputChange('futureWish', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-400"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Send className="h-5 w-5 mr-2" />
              Submit My Responses ✨
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SlamBookForm;
