'use client';
import { useUser } from '@/lib/hooks/useUser';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function WindowDNAPage() {
  const { data: user } = useUser();

  let dna = null;
  if (user?.windowDna) {
    try { dna = JSON.parse(user.windowDna); } catch { dna = null; }
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-2">Window DNA</h1>
      <p className="font-sans text-sm text-slate mb-8">
        Save your window measurements and style preferences so every order is perfectly tailored.
      </p>

      {!dna ? (
        <div className="p-8 border border-dashed border-linen text-center space-y-4">
          <p className="font-serif text-xl font-light text-charcoal">No measurements saved yet</p>
          <p className="font-sans text-sm text-slate">Your window profile makes ordering the perfect size effortless.</p>
          <Button variant="outline">Set Up Window DNA</Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dna.measurements && (
              <>
                <div className="p-4 bg-ivory-dark">
                  <p className="font-sans text-xs uppercase tracking-widest text-slate mb-1">Width</p>
                  <p className="font-serif text-xl font-light">{dna.measurements.width} cm</p>
                </div>
                <div className="p-4 bg-ivory-dark">
                  <p className="font-sans text-xs uppercase tracking-widest text-slate mb-1">Height</p>
                  <p className="font-serif text-xl font-light">{dna.measurements.height} cm</p>
                </div>
                <div className="p-4 bg-ivory-dark">
                  <p className="font-sans text-xs uppercase tracking-widest text-slate mb-1">Rod Type</p>
                  <p className="font-serif text-xl font-light capitalize">{dna.measurements.rodType}</p>
                </div>
              </>
            )}
          </div>
          {dna.preferences && (
            <div className="p-4 border border-linen">
              <p className="font-sans text-xs uppercase tracking-widest text-slate mb-3">Style Preferences</p>
              <div className="grid grid-cols-2 gap-2 font-sans text-sm">
                <div><span className="text-slate">Room:</span> <span className="capitalize">{dna.preferences.room}</span></div>
                <div><span className="text-slate">Light:</span> <span className="capitalize">{dna.preferences.lightDirection}</span></div>
                <div><span className="text-slate">Opacity:</span> {dna.preferences.opacityLevel}/5</div>
                <div><span className="text-slate">Mood:</span> <span className="capitalize">{dna.preferences.moodPreference}</span></div>
              </div>
            </div>
          )}
          <Button variant="outline" size="sm">Edit Window DNA</Button>
        </div>
      )}
    </div>
  );
}
