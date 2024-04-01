import {ProviderObj, ProvidersType } from "@/types";
import Image from "next/image";
import { ReactNode } from "react";
import classes from "@/styles/ArchiveSingle.module.css";

const Providers = ({ providers} : { providers: ProvidersType}) => {
    
    let buyProviders: ReactNode[] = [], 
        streamProviders: ReactNode[] = [], 
        rentProviders: ReactNode[] = [];

    if(providers) {
        
        const { buy } = providers;
        const { flatrate:stream } = providers;
        const { rent } = providers;
                
        let i = 0;

        const providerLogoMap = (provider: ProviderObj) => {
            return (
                <Image 
                    width={40}
                    height={40}
                    key={(i++)+provider.provider_name} 
                    src={process.env.posterBaseUrl+provider.logo_path} 
                    alt={provider.provider_name}
                    title={provider.provider_name} />
            )
        };

        if(buy && buy.length > 0) {
            buyProviders = buy.map(providerLogoMap);
        }

        if(stream && stream.length > 0) {
            streamProviders = stream.map(providerLogoMap);
        }

        if(rent && rent.length > 0) {
            rentProviders = rent.map(providerLogoMap);
        }
        
    }

    return (
        <div className={classes['providers']}>
            {buyProviders.length > 0 && 
                <div>
                    <h3>Acquistabile</h3> 
                    {buyProviders}
                </div>
            }
            {streamProviders.length > 0 && 
                <div>
                    <h3>In Streaming</h3> 
                    {streamProviders}
                </div>
            }
            {rentProviders.length > 0 && 
                <div>
                    <h3>Noleggiabile</h3> 
                    {rentProviders}
                </div>
            }
            {(rentProviders.length > 0 || streamProviders.length > 0 || buyProviders.length > 0) &&
                <p className={classes['disclaimer']}>Le informazioni riguardo i provider sono gentilmente fornite da JustWatch</p>
            }
        </div>
    );
};

export default Providers;