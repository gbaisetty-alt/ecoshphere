import { Bike, BusFront, Droplets, Leaf, Lightbulb, Recycle, Trees } from 'lucide-react'

export const initialActions = [
  { id: 'transport', label: 'Used public transport', points: 12, impact: { co2: 2.8, water: 0, energy: 0, waste: 0 }, completed: true, icon: BusFront },
  { id: 'bottle', label: 'Used a reusable water bottle', points: 8, impact: { co2: 0.2, water: 24, energy: 0, waste: 0.4 }, completed: true, icon: Droplets },
  { id: 'electricity', label: 'Saved electricity', points: 10, impact: { co2: 0.8, water: 0, energy: 2.4, waste: 0 }, completed: false, icon: Lightbulb },
  { id: 'waste', label: 'Avoided food waste', points: 14, impact: { co2: 1.2, water: 0, energy: 0, waste: 1.1 }, completed: false, icon: Leaf },
  { id: 'plastic', label: 'Used less plastic', points: 9, impact: { co2: 0.4, water: 18, energy: 0, waste: 0.8 }, completed: false, icon: Recycle },
]

export const impactStats = [
  { label: 'CO₂ Saved', value: '24.8 kg', detail: 'Lower emissions', accent: 'emerald', icon: Trees },
  { label: 'Water Saved', value: '1,240 L', detail: 'Everyday efficiency', accent: 'cyan', icon: Droplets },
  { label: 'Energy Saved', value: '18.4 kWh', detail: 'Smarter usage', accent: 'amber', icon: Lightbulb },
  { label: 'Waste Reduced', value: '6.2 kg', detail: 'Less landfill', accent: 'lime', icon: Recycle },
]

export const challenges = [
  {
    title: 'Zero Plastic Week',
    description: 'Skip disposable packaging for seven days.',
    duration: '7 days',
    reward: 150,
    actionId: 'plastic',
    current: 0,
    total: 7,
    status: 'In progress',
  },
  {
    title: 'Green Commute',
    description: 'Walk or cycle instead of driving for 5 days.',
    duration: '5 days',
    reward: 120,
    actionId: 'transport',
    current: 0,
    total: 5,
    status: 'Almost there',
  },
  {
    title: 'Water Saver',
    description: 'Reduce unnecessary water usage for 7 days.',
    duration: '7 days',
    reward: 180,
    actionId: 'bottle',
    current: 0,
    total: 7,
    status: 'Pending',
  },
]

export const habitWeek = [
  { day: 'Mon', done: true },
  { day: 'Tue', done: true },
  { day: 'Wed', done: true },
  { day: 'Thu', done: true },
  { day: 'Fri', done: true },
  { day: 'Sat', done: false },
  { day: 'Sun', done: false },
]

export const analyticsData = {
  '7': [
    { name: 'Mon', co2: 2.5, water: 130, energy: 3.1, waste: 1.0, score: 68 },
    { name: 'Tue', co2: 3.1, water: 150, energy: 2.7, waste: 1.4, score: 70 },
    { name: 'Wed', co2: 2.2, water: 170, energy: 3.3, waste: 1.2, score: 73 },
    { name: 'Thu', co2: 1.9, water: 180, energy: 2.9, waste: 1.1, score: 75 },
    { name: 'Fri', co2: 1.5, water: 200, energy: 2.6, waste: 0.9, score: 78 },
    { name: 'Sat', co2: 1.3, water: 220, energy: 2.5, waste: 0.7, score: 81 },
    { name: 'Sun', co2: 1.2, water: 240, energy: 2.2, waste: 0.5, score: 84 },
  ],
  '30': [
    { name: 'W1', co2: 11.4, water: 640, energy: 13.1, waste: 4.2, score: 68 },
    { name: 'W2', co2: 10.8, water: 720, energy: 12.5, waste: 4.0, score: 71 },
    { name: 'W3', co2: 9.9, water: 860, energy: 11.7, waste: 3.6, score: 76 },
    { name: 'W4', co2: 9.2, water: 960, energy: 10.4, waste: 3.3, score: 81 },
  ],
  '180': [
    { name: 'Jan', co2: 35, water: 1760, energy: 41, waste: 13.5, score: 54 },
    { name: 'Feb', co2: 30, water: 1860, energy: 38, waste: 12.4, score: 60 },
    { name: 'Mar', co2: 27, water: 2010, energy: 34, waste: 11.3, score: 66 },
    { name: 'Apr', co2: 25, water: 2140, energy: 30, waste: 10.2, score: 72 },
    { name: 'May', co2: 23, water: 2280, energy: 26, waste: 9.1, score: 78 },
    { name: 'Jun', co2: 20, water: 2400, energy: 22, waste: 8.2, score: 84 },
  ],
}

export const mapPoints = [
  { name: 'Green Loop Recycle', type: 'Recycling center', x: '28%', y: '34%' },
  { name: 'Riverbank Park', type: 'Park', x: '63%', y: '50%' },
  { name: 'Cycle Hub', type: 'Bike station', x: '52%', y: '22%' },
  { name: 'Solar Charge', type: 'EV charging', x: '74%', y: '68%' },
  { name: 'Urban Garden', type: 'Community garden', x: '40%', y: '72%' },
]

export const profileAchievements = [
  { title: 'First Step', icon: Leaf },
  { title: 'Recycling Hero', icon: Recycle },
  { title: 'Green Commuter', icon: Bike },
  { title: 'Water Saver', icon: Droplets },
  { title: 'Planet Protector', icon: Trees },
]
