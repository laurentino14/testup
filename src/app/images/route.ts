import axios from 'axios'
 

export async function POST(request: Request) {
  const res = await request.json()
  console.log(res)
  const result = await axios.post(`https://api.tiendanube.com/v1/3819256/products/${res.product}/images`,res.image,{headers:{"Content-Type":"application/json;charset=UTF-8","User-Agent":"Cadastro em massa 2 - Dev (laurentinodeev@gmail.com)","Authentication":"bearer fa877755193786115649ce35b0880d5989ec10da"},}).then(res => res)
return Response.json({res})
}
    
