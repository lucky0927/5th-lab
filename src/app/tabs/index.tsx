import React, {useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';

const COLORS={
    background: '#FFFFFF',
    surface: '#F8FAFA',
    text: '#1E293B',
    secondaryText: '#64748B',
    border: '#E2E8F0',
    rock: '#EF4444',
    paper: '#0D9488',
    scissors: '#D97706',
    vs: '#6366F1',
    win: '#0D9488',
    draw: '#D97706',
    loss: '#EF4444',
};

const CHOICES=[
    {name: 'Rock',emoji: '✊', color: COLORS.rock},
    {name: 'Paper', emoji: '✋', color: COLORS.paper},
    {name: 'Scissors', emoji: '✌️', color: COLORS.scissors},
];

export default function PlayScreen() {
    const [userChoice, setUserChoice] = useState<(typeof CHOICES)[number] | null>(null);
    const [computerChoice, setComputerChoice] = useState<(typeof CHOICES)[number] | null>(null);
    const [result, setResult] = useState('Make your move!');
    const [resultColor, setResultColor] = useState(COLORS.text);
    const [score, setScore] = useState({wins: 0, losses: 0, draws: 0});

    const playGame = (choice: (typeof CHOICES)[number]) => {
        const randomNum= Math.floor(Math.random()*3);
        const compChoice= CHOICES[randomNum];
        setUserChoice(choice);
        setComputerChoice(compChoice);

        if (choice.name === compChoice.name) {
            setResult("It's a Draw! 🤝");
            setResultColor(COLORS.draw);
            setScore((prev) => ({...prev, draws: prev.draws + 1}));
        } else if (
            (choice.name === 'Rock' && compChoice.name === 'Scissors') ||
            (choice.name === 'Paper' && compChoice.name === 'Rock') ||
            (choice.name === 'Scissors' && compChoice.name === 'Paper')
        ) {
            setResult('You Win! 🎉');
            setResultColor(COLORS.win);
            setScore((prev) => ({...prev, wins: prev.wins + 1}));
        } else {
            setResult('Computer Wins! 😢');
            setResultColor(COLORS.loss);
            setScore((prev) => ({...prev, losses: prev.losses + 1}));
        }
};

const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('Make your move!');
    setResultColor(COLORS.text);
    setScore({wins: 0, losses: 0, draws: 0});
};

return (
    <View style={styles.container}>
        <Text style={styles.header}>RPS Showdown</Text>
        <Text style={styles.subtitle}>Rock Paper Scissors</Text>


        <View style={styles.scoreboard}>
            <View style = {styles.scoreColumn}>
                <Text style={styles.scoreLabel}>WINS</Text>
                <Text style={[styles.scoreValue, {color: COLORS.win}]}>{score.wins}</Text>
            </View>
            <View style = {styles.scoreColumn}>
                <Text style={styles.scoreLabel}>DRAWS</Text>
                <Text style={[styles.scoreValue, {color: COLORS.draw}]}>{score.draws}</Text>
            </View>
            <View style = {styles.scoreColumn}>
                <Text style={styles.scoreLabel}>LOSSES</Text>
                <Text style={[styles.scoreValue, {color: COLORS.loss}]}>{score.losses}</Text>
            </View>
        </View>

       
