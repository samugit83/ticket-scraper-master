'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchArtistEventTicketOne, SubSearchEventTicketOne } from "@/server_actions/queries";
import { addNewTrackedTicket } from "@/server_actions/mutations";
import { SkeletonComp } from "@/csr_comps/skeleton_comp";
import { Loader } from '@/csr_comps/loader/loader'
import { RawTicketDataTypes } from '@/types/types'
import { useSelector, useDispatch } from 'react-redux';
import { push_NewTrackedTicket, update_oneSubIsLoading } from '@/redux/reduxfeat/globalslice'
import { RootState } from '@/redux/store';
import { BellOnIcon, BellOffIcon } from '@/csr_comps/icons'
import { general_params } from '@/my-app_config'
import Image from 'next/image'



export const PageComp = () => {

  const dispatch = useDispatch() 

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResult, setSearchQueryResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);

    if (searchQuery.trim() !== "") {
      const result = await SearchArtistEventTicketOne(searchQuery);
      setSearchQueryResult(result);
    }

    setIsLoading(false);
  };



  const ArtistComp = ({item, idx}: {item: any, idx: number}) => {

    const [subSearchResult, setSubSearchResult] = useState([]);
    const [subIsLoading, setSubIsLoading] = useState(false);

    const oneSubIsLoading = useSelector((state: RootState) => state.global.oneSubIsLoading)

    const handleSubSearch = async (eventUrl: string) => {

      setSubIsLoading(true);
      dispatch(update_oneSubIsLoading(true))
      const result = await SubSearchEventTicketOne(eventUrl);
      setSubSearchResult(result)
      setSubIsLoading(false);
      dispatch(update_oneSubIsLoading(false))
  
      return result
  
    }; 


    const EventComp = ({rawTicketData, imgUrl}: {rawTicketData: RawTicketDataTypes, imgUrl: string}) => {

      const UserData = useSelector((state: RootState) => state.global.UserData)
      const [nrTicketValue, setNrTicketValue] = useState(1);

      const trackedTick = UserData?.trackedTickets
        ?.find(itm => itm.eventName === item.title && itm.eventIsoDatetime === rawTicketData.iso_datetime)

      const handleNewTrackedTicket = async () => {

          let trackedTicketData = {
            eventName: item.title,
            eventIsoDatetime: rawTicketData.iso_datetime,
            city: rawTicketData.city?.toLowerCase(),
            userName: 'admin',
            isActive: true,
            creationTime: new Date().getTime(),
            lastNotificationTime: null,
            imgUrl,
            nrTickets: nrTicketValue,
            channels: ['email', 'whatsapp'],
            emailList: general_params.defaultEmailList,
            phoneList: general_params.defaultPhoneList
          }

          let resp = await addNewTrackedTicket({trackedTicketData})

          if(resp){ 
            dispatch(push_NewTrackedTicket(trackedTicketData))
          };

      }

      const NumberInput = () => {

        const increment = () => {
          if (nrTicketValue < 9) {
            setNrTicketValue(prevValue => prevValue + 1);
          }
        };
      
        const decrement = () => {
          if (nrTicketValue > 1) {
            setNrTicketValue(prevValue => prevValue - 1);
          }
        };
      
        return (
          <div className="text-[20px] text-primary w-[30px] flex mr-[30px]">
            <button onClick={decrement} disabled={nrTicketValue === 1}>-</button>
              <input className="w-[18px] ml-[10px]" type="text" value={nrTicketValue} readOnly />
            <button onClick={increment} disabled={nrTicketValue === 9}>+</button>
          </div>
        );
      }

      return (
        <div className="bg-background p-[15px] rounded-lg shadow-md mt-[15px] flex items-center justify-between">
          <div>
            <p className="text-[17px] font-semibold">
              {rawTicketData.date_time}
            </p>
            <p>
              {rawTicketData.location}
            </p>
          </div>
          <div className="space-x-[10px] flex items-center">
            {trackedTick ? 
             <p className="text-[20px] text-[grey] mr-[30px]">
              {trackedTick.nrTickets}
             </p>
             : <NumberInput />}
            <a href={'https://www.ticketone.it' + rawTicketData.link} target="_blank" rel="noopener noreferrer">
              <Button className="h-[50px] w-[100px]" type="button" >
                Link<br/>all&#39;evento
              </Button>
            </a>
            <Button className={`h-[50px] w-[100px] bg-secondary ${trackedTick ? 'cursor-default' : 'cursor-pointer'}`}  
              onClick={() => !trackedTick ? handleNewTrackedTicket() : null}>
                {!trackedTick ? 
                <>Attiva<br/>tracking</> :
                trackedTick?.isActive ? 
                <BellOnIcon size={20} fill={'white'} /> :
                <BellOffIcon size={20} fill={'white'} />}
            </Button>
          </div>
        </div>
      )

    }




    return  <div key={`key-${idx}`} className="bg-accent p-[25px] rounded-lg shadow-md">
              <div className="w-full flex justify-between items-center gap-x-[30px]">
                <div className="flex items-center gap-x-[30px]">
                  <Image
                      src={item.img}
                      alt="image"
                      height={100}
                      width={100}
                  />
                  <p className="text-[18px] font-semibold">
                    {item.title}
                  </p> 
                  </div>    
                  {!subSearchResult.length &&
                    <Button 
                      type="button" 
                      onClick={() => handleSubSearch(item.link)} 
                      disabled={!oneSubIsLoading ? false : true}
                  >
                      Trova eventi
                  </Button>}
                </div>
                {subIsLoading ? 
                <div className="my-[20px] w-full flex justify-center">
                  <Loader size={60}/> 
                </div> : 
                subSearchResult.map((itm: any, idx: number) => <EventComp key={'key-' + idx} rawTicketData={itm} imgUrl={item.img} />)}
            </div>
  }



  return (
    <>
      <div className="flex space-x-[20px] bg-accent p-[30px] rounded-lg shadow-md">
        <Input
          type="text"
          className="bg-background"
          placeholder="Ricerca artisti o eventi"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button type="button" onClick={handleSearch}>
          Cerca
        </Button>
      </div>
      <div className="space-y-[15px] mt-[30px] pb-[100px]">
        {isLoading ? (
          <SkeletonComp />
        ) : (
          searchQueryResult.map((item: any, idx: number) => <ArtistComp key={'key-' + idx} item={item} idx={idx}/>)
        )}
      </div>
    </>
  );

  
}
