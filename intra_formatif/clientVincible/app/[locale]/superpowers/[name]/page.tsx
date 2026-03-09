"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTwoWayBinding } from "../../../_hooks/use-two-way-binding";
import { useState } from "react";
import { Character } from "@/app/_types/character";
import { usePowerQuery } from "@/app/_hooks/use-power-query";

export default function Superpowers() {

    const powerInput = useTwoWayBinding(""); // Hook pour le two-way binding

    const { characters, getCharacters } = usePowerQuery();


    return (
        <div>
            <h2 className="text-xl font-bold my-1">Recherche de personnages par pouvoir</h2>

            <p className="my-1">Exemples : Vol, Invulnérabilité, Régénération, Vitesse surhumaine, Force surhumaine, etc.</p>

            <Input type="text" {...powerInput}  placeholder="Nom du personnage" className="bg-white w-xs" />
            <Button variant="outline" onClick={() => getCharacters(powerInput.value)} className="ml-1 cursor-pointer">Rechercher</Button>

            <p className="my-2"></p>

            {characters.map(c =>(  
            <div key={c.name} className="row">
                <div>
                    <img src={c.imageUrl} alt="Invincible" />
                    <p>Nom : {c.name}</p>
                    <p>Âge : {c.age == null ? "Inconnu" : c.age}</p>
                    <p>Statut : {c.isAlive ? 'En vie' : 'Vaincu(e)'}</p>
                    <hr className="my-1" />
                </div>
            </div>))}
        </div>
    );

}