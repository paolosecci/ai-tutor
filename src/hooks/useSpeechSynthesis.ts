'use client';
import { useRef, useState, useCallback } from 'react';

interface UseSpeechSynthesisOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const useSpeechSynthesis = ({
  lang = 'en-US',
  rate = 1,
  pitch = 1,
  volume = 1,
}: UseSpeechSynthesisOptions = {}) => {
  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string) => {
    if (!synthRef.current || !text) return;

    // Cancel any ongoing speech
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  }, [lang, rate, pitch, volume]);

  const cancel = useCallback(() => {
    if (synthRef.current?.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { speak, cancel, isSpeaking };
};
