"use client"
import {Axios} from "axios";
import { createObjectURL,blobToArrayBuffer } from "blob-util";
import { randomUUID } from "crypto";
import Image from "next/image";
import { rawListeners } from "process";
import { useEffect, useState } from "react";

type File = {
        url:string,
        file:any,
        data:Data,
        blob:Blob
}
type Data = {
    name:string,
    description?:string,
    price?:number,
    quantity?:number,
    category?:string,
    subcategory?:string,
    tags?:string[],
    images?:File[]
}

const axios = new Axios({})

export default function Page(){
    useEffect(()=>{
       // WARNING: For GET requests, body is set to null by browsers.

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.tiendanube.com/v1/3819256/products");
xhr.setRequestHeader("Authentication", "bearer d21ac4e0c8787d8e08143d55302fe1bd8fb7d666");

xhr.send();
    },[])
        const [file, setFile] = useState<Array<File>>([]);
        const imageAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                    for(let i = 0; i < e.target.files.length; i++){
                        const file = e.target.files[i]
                        const url = createObjectURL(file);
                        const blob = new Blob([file], { type: file.type });
                        const toBase64 = async (file: any) => {
                          return await new Promise((resolve, reject) => {
                            const fileReader = new FileReader();
                            
                            fileReader.readAsDataURL(file);
                            
                            fileReader.onload = () => {
                              resolve(fileReader.result);
                            };
                            
                            fileReader.onerror = (error) => {
                              reject(error);
                            };
                          });
                        };
                        
                        const base64 = await toBase64(file)
                        setFile(prevState => [...prevState, {url:url, file:base64,blob:blob,data:{name:file?.name}}]);
                    }
                } 
                
            };

            const changeName = (e: React.ChangeEvent<HTMLInputElement>,index:number) => {
                const previous = file;
                const New = []

                for(let i = 0; i < previous.length; i++){
                    if(i == index){
                        previous[i].data.name = e.target.value
                    }
                    New.push(previous[i])
                }
                setFile([...New])
            }

            const testSend = async (el:any) =>{
                const body = {
                    name:"Teste - Adicionado pela API 3333" + Math.random(),
                    image:[{
                      src:el.url
                    }]

                }
                const bodyFinal = JSON.stringify(body)


                // await fetch('/new',{method:"POST",body:bodyFinal,mode:"no-cors",headers:{"Authentication":"bearer fa877755193786115649ce35b0880d5989ec10da",'User-Agent': 'Cadastro em massa 2 - Dev (laurentinodeev@gmail.com)','Content-Type':"application/json"}}).then(res=>console.log(res)).catch(err=>console.log(err))
                
                const result = await axios.post('/new',bodyFinal).then(res => res.data)
                
              
                console.log(result,"<------- RESULTADO 1")  
            }
    return <main className=" w-screen h-screen ">
        <section className="w-full flex justify-end px-10 my-10"><button
                type='button'
                className='bg-gray-200 hover:bg-gray-100 w-44 font-medium hover:cursor-pointer text-bg rounded-md flex items-center justify-center py-2'
              >
                <label
                  htmlFor='profilepicture'
                  className='   hover:cursor-pointer     '
                >
                  Selecionar imagens
                </label>
              </button></section>
        <section className="flex flex-col px-10 gap-y-4">{file != null ? file?.map((el,indx) => {
            return <div key={indx} className='w-full py-4 px-4  bg-gray-100 flex rounded-md justify-between gap-2'>
            <div className="flex items-center w-52 flex-col"><Image
                width={100}
                height={100}
              src={el.url}
              className=' w-40 rounded-lg '
              alt=''
            />
            <span className="text-sm mt-4">{el.file.name}</span>
            </div>
            <div className="w-full flex  items-center">
                <div className="flex gap-2 items-center"><label htmlFor="name" className="text-sm font-medium">Name:</label><input type="text" className="text-sm py-1 rounded-sm px-2" id="name"  value={el.data.name} onChange={e => changeName(e,indx)}/></div>
            </div>
            <div><button
                type='button'
                className='bg-red-400 hover:bg-red-500 w-fit px-4 font-medium hover:cursor-pointer text-sm rounded-md flex items-center justify-center py-2'
              >Excluir</button>
              <button
              type='button'
                onClick={()=>testSend(el)}
              className='bg-red-400 hover:bg-red-500 w-fit px-4 font-medium hover:cursor-pointer text-sm rounded-md flex items-center justify-center py-2'
            >Enviar</button></div>
          </div>
        }) : (
              <></>
            )}</section>
        
        <input
              className='hidden'
              type='file'
              accept='image/*'
              required
              onChange={imageAdd}
              multiple={true}
              name='profilepicture'
              id='profilepicture'
            />
    </main>
}