import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DanceFormCard from "@/components/DanceFormCard";
import heroImage from "@/assets/hero-dance.jpg";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const danceforms = [
    {
      title: "Hip-Hop",
      description:
        "Street-style dance with energetic moves and urban beats. Born in the Bronx, this dynamic style combines rhythm, attitude, and self-expression.",
      icon: "🎤",
      difficulty: "Intermediate",
      video: "https://youtube.com/shorts/-Z2TrmiOORg?si=LJX0lpjhItGfCyvA",
      features: [
        "Popping, locking, and breaking techniques",
        "Freestyle and choreographed routines",
        "Perfect for high-energy tracks"
      ]
    },
    {
      title: "Freestyle",
      description:
        "Express yourself with improvisational movements and creativity. Let the music guide you through spontaneous, unique dance expressions.",
      icon: "🌟",
      difficulty: "Beginner-Friendly",
      video: "https://www.youtube.com/embed/9bZkp7q19f0",
      features: [
        "No fixed choreography - pure creativity",
        "Adaptable to any music genre",
        "Develops personal style and confidence"
      ]
    },
    {
      title: "DJ Mix",
      description:
        "Electronic dance styles synchronized with remix beats. High-energy moves perfectly timed to drops, builds, and electronic rhythms.",
      icon: "🎧",
      difficulty: "Intermediate",
      video: "https://www.youtube.com/embed/5NV6Rdv1a3I",
      features: [
        "Synced to EDM and electronic music",
        "Club-style movements and energy",
        "Emphasis on beat matching"
      ]
    },
    {
      title: "Contemporary",
      description:
        "Fluid movements blending ballet and modern dance. An expressive style that combines technical precision with emotional storytelling.",
      icon: "💫",
      difficulty: "Advanced",
      video: "https://www.youtube.com/embed/CjX4JmhBWxE",
      features: [
        "Ballet technique meets modern flow",
        "Floor work and lyrical movements",
        "Emotional and artistic expression"
      ]
    },
    {
      title: "Breaking",
      description:
        "Acrobatic moves with power, freezes, and footwork. One of the original elements of hip-hop culture with gravity-defying moves.",
      icon: "⚡",
      difficulty: "Advanced",
      video: "https://www.youtube.com/embed/Wj6ANy-jQ0A",
      features: [
        "Power moves and freezes",
        "Top rock and dynamic footwork",
        "Battle-ready choreography"
      ]
    },
    {
      title: "Jazz",
      description:
        "Dynamic style with sharp movements and theatrical flair. Broadway-inspired dance with high energy and show-stopping presence.",
      icon: "🎭",
      difficulty: "Intermediate",
      video: "https://www.youtube.com/embed/bSyY5oO7glk",
      features: [
        "Sharp isolations and turns",
        "Broadway musical style",
        "High-energy expressive movements"
      ]
    },

    // ⭐ NEW DANCE FORMS

    {
      title: "Tap Dance",
      description:
        "Rhythmic footwork using tap shoes to create crisp beats and musical patterns.",
      icon: "👞",
      difficulty: "Intermediate",
      video: "https://www.youtube.com/embed/G7Qp6-6kN2Y",
      features: [
        "Fast rhythmic footwork",
        "Musicality and timing",
        "Performed using tap shoes"
      ]
    },
    {
      title: "Samba",
      description:
        "A lively Brazilian dance full of rhythm, bounce, and celebratory movement.",
      icon: "💃",
      difficulty: "Intermediate",
      video: "https://www.youtube.com/embed/l_E6TiqS308",
      features: [
        "Fast-paced hip movement",
        "Energetic footwork",
        "Carnival-inspired rhythm"
      ]
    },
    {
      title: "Salsa",
      description:
        "A passionate Latin dance with energetic partner dynamics and rhythmic flair.",
      icon: "🔥",
      difficulty: "Beginner to Intermediate",
      video: "https://www.youtube.com/embed/8vS3j1jvR2o",
      features: [
        "Quick foot patterns",
        "Partner and solo movements",
        "Latin rhythm and body flow"
      ]
    },
    {
      title: "Classical Ballet",
      description:
        "Highly technical dance form emphasizing grace, precision, and strong foundation.",
      icon: "🩰",
      difficulty: "Advanced",
      video: "https://www.youtube.com/embed/XF9ZV_1dHq8",
      features: [
        "Strong foundational technique",
        "Poise, control, and balance",
        "Core of many dance forms"
      ]
    },
    {
      title: "Afro Dance",
      description:
        "High-energy African dance with expressive full-body movements and rhythm.",
      icon: "🌍",
      difficulty: "Intermediate",
      video: "https://www.youtube.com/embed/IevYJxgOZ-A",
      features: [
        "Full-body expressive moves",
        "African cultural foundations",
        "Great for stamina"
      ]
    },
    {
      title: "Bollywood",
      description:
        "Vibrant Indian dance style combining classical, folk, hip-hop, and cinematic expressions.",
      icon: "🎬",
      difficulty: "Beginner-Friendly",
      video: "https://www.youtube.com/embed/4F1qY0uA-ho",
      features: [
        "Expressive storytelling",
        "Mix of Indian + Western styles",
        "Colorful energetic movements"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-accent/75 to-secondary/85 z-10" />
        
        <div className="container mx-auto px-4 z-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Feel the Beat,
            <br />
            <span className="bg-gradient-to-r from-white via-secondary to-white bg-clip-text text-transparent">
              Learn the Moves
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up">
            Discover choreography for your favorite songs across multiple dance styles. 
            Watch, learn, and master the art of dance with personalized animations.
          </p>
          
          <Link to="/signup">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-white/20 transition-all animate-pulse-glow group"
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Dance Forms Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Explore Dance Forms
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            From global street styles to classical movements, discover the perfect dance form for every beat.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {danceforms.map((form, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <DanceFormCard {...form} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About DanceBeats
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DanceBeats combines music and movement to create a unique learning experience. 
            Our platform generates custom choreography for your favorite songs, helping you 
            master different dance styles at your own pace. Whether you're a beginner or a 
            pro, there's always a new beat to explore.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
