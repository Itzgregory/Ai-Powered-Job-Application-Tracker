'use client';
import {Aboutmain} from "./about/aboutMain"

export function ProfileWrapper() {
  return (
    <header className="shadow-sm w-full">
      <div className="container mx-auto px-4 py-4 max-w-7xl border rounded w-full">
        <div className=" w-full">
          <Aboutmain/>
        </div>
      </div>
    </header>
  );
}


