"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTwoWayBinding } from "../../../_hooks/use-two-way-binding";
import { useEffect, useState } from "react";
import { usePowerQuery } from "@/app/_hooks/use-power-query";
import { useParams } from "next/navigation";

export default function Superpowers() {

    const powerInput = useTwoWayBinding(""); // Hook pour le two-way binding
    const params = useParams<{name: string}>();
    const {characters, getCharacters } = usePowerQuery();
        useEffect(() => {
            getCharacters(params.name);
        },[]);
    return (
        <div>
            <h2 className="text-xl font-bold my-1">Recherche de personnages par pouvoir</h2>

            <p className="my-1">Exemples : Vol, Invulnérabilité, Régénération, Vitesse surhumaine, Force surhumaine, etc.</p>

            <Input type="text" {...powerInput}  placeholder="Nom du personnage" className="bg-white w-xs" />
            <Button variant="outline" onClick={() =>getCharacters(powerInput.value)} className="ml-1 cursor-pointer">Rechercher</Button>

            <p className="my-2"></p>

           
            <div  className="row">
                 {characters.map(c =>(  
                <div key={c.name}>
                    <img src={c.imageUrl} alt="Invincible" />
                    <p>Nom : {c.name}</p>
                    <p>Âge : {c.age == null ? "Inconnu" : c.age}</p>
                    <p>Statut : {c.isAlive ? 'En vie' : 'Vaincu(e)'}</p>
                    <hr className="my-1" />
                </div>
                ))}
            </div>
            
        </div>

    );

}