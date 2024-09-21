import { Zap, Paintbrush, Moon, Layout } from "lucide-react"

export const bentoitems = [
    {
      title: 'Themeable',
      description: 'Build beautiful UIs with ease. Start with stofli design, or create your own sophisticated theme.',
      icon: <Paintbrush className="w-6 h-6 text-[#d94fbb]" />,
    },
    {
      title: 'Fast',
      description: 'Built on top of Tailwind CSS, which means no runtime styles, and no unnecessary classes in your bundle.',
      icon: <Zap className="w-6 h-6 text-[#d94fbb]" />,
    },
    {
      title: 'Light & Dark UI',
      description: 'Automatic dark mode recognition, NextUI automatically changes the theme when detects HTML theme prop changes.',
      icon: <Moon className="w-6 h-6 text-[#d94fbb]" />,
    },
    {
      title: 'Dedicated to accessibility',
      description: 'We believe in building for everyone. That\'s why accessibility is a high priority with every new feature we ship.',
      icon: <Layout className="w-6 h-6 text-[#d94fbb]" />,
    },
  ]