"use client";

import { useEffect, useState } from "react";
import { Character } from "../../_types/character";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePowerQuery } from "@/app/_hooks/use-power-query";
export default function Favorites() {
 const locale = useLocale();
 const router = useRouter();
 const [selectLocale, setSelectLocale] = useState(locale);
 const pathname = usePathname();
 const t = useTranslations('favorites');
 const [favorites, setFavorites] = useState<Character[]>([]);
 const pouvoir = usePowerQuery();
     useEffect(() => {
            pouvoir.characters
            const guestJSON : string | null = localStorage.getItem("character");
             if(guestJSON) setFavorites(JSON.parse(guestJSON));
         },[]);
 
function emptyFavs() {
      setFavorites([])
      localStorage.removeItem("character");

}
function chooseLocale(e : any){
    setSelectLocale(e.target.value); // On met l'état à jour
    router.replace(pathname, { locale : e.target.value }); // On change la locale dans la route
}

    return (
        <div>
            <h2 className="text-xl my-2 font-bold">{t('title')}</h2>
             <select onChange={chooseLocale} value={selectLocale}>
              <option value="fr">Français</option>
              <option value="en">English</option>
             </select>
            <div className="row gap-2 flex-wrap">
                {favorites.map((f,index) =>
                    <div key={index}>
                        <img src={f.imageUrl} alt={f.name} />
                        <p>{t('name')} : {f.name}</p>
                        <hr className="my-1" />
                    </div>
                )}
            </div>

            <Button onClick={emptyFavs} className="cursor-pointer">{t('empty')}</Button>
        </div>
    );

}