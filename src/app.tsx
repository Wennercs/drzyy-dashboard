
import { useEffect, useMemo, useState } from 'react';

type Customer={id:string;name:string;age:number;isVip:boolean;checkInTime:string}
type Item={id:string;productName:string;quantity:number;unitPrice:number}

export default function App(){
const [customers,setCustomers]=useState<Customer[]>([]);
const [search,setSearch]=useState('');
const [vipOnly,setVipOnly]=useState(false);
const [selected,setSelected]=useState<Customer|null>(null);
const [orders,setOrders]=useState<Record<string,Item[]>>({});

useEffect(()=>{
const timer=setInterval(()=>{
const c:Customer={
id:crypto.randomUUID(),
name:'Cliente '+Math.floor(Math.random()*999),
age:18+Math.floor(Math.random()*40),
isVip:Math.random()>0.7,
checkInTime:new Date().toLocaleTimeString()
};
setCustomers(p=>[c,...p]);
},3000);
return ()=>clearInterval(timer);
},[]);

const filtered=useMemo(()=>customers.filter(c=>(!vipOnly||c.isVip)&&c.name.toLowerCase().includes(search.toLowerCase())),[customers,search,vipOnly]);

const addItem=(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();
if(!selected) return;
const fd=new FormData(e.currentTarget);
const item:Item={
id:crypto.randomUUID(),
productName:String(fd.get('name')),
quantity:Number(fd.get('qty')),
unitPrice:Number(fd.get('price'))
};
setOrders(o=>({...o,[selected.id]:[...(o[selected.id]||[]),item]}));
e.currentTarget.reset();
};

const removeItem=(id:string)=>{
if(!selected) return;
setOrders(o=>({...o,[selected.id]:(o[selected.id]||[]).filter(i=>i.id!==id)}));
};

const items=selected?(orders[selected.id]||[]):[];
const total=items.reduce((a,b)=>a+b.quantity*b.unitPrice,0);

return (
<div className="container">
<h1>Drzyy Dashboard</h1>

<div className="grid">
<div className="card">Pessoas: {customers.length}</div>
<div className="card">VIPs: {customers.filter(c=>c.isVip).length}</div>
<div className="card">Ocupação: {((customers.length/500)*100).toFixed(1)}%</div>
</div>

<div style={{marginTop:12}}>
<input placeholder="Buscar" value={search} onChange={e=>setSearch(e.target.value)}/>
<label><input type="checkbox" checked={vipOnly} onChange={e=>setVipOnly(e.target.checked)}/> Apenas VIP</label>
</div>

<table>
<thead><tr><th>Nome</th><th>Idade</th><th>VIP</th><th>Entrada</th></tr></thead>
<tbody>
{filtered.map(c=>(
<tr key={c.id} onClick={()=>setSelected(c)} style={{cursor:'pointer'}}>
<td>{c.name}</td><td>{c.age}</td><td>{c.isVip?'Sim':'Não'}</td><td>{c.checkInTime}</td>
</tr>
))}
</tbody>
</table>

{selected && (
<div className="drawer">
<button onClick={()=>setSelected(null)}>Fechar</button>
<h2>{selected.name}</h2>
<p>{selected.isVip?'VIP':'Normal'}</p>

<form onSubmit={addItem}>
<input name="name" placeholder="Produto" required/>
<input name="qty" type="number" placeholder="Qtd" required/>
<input name="price" type="number" step="0.01" placeholder="Preço" required/>
<button type="submit">Adicionar</button>
</form>

<ul>
{items.map(i=>(
<li key={i.id}>
{i.productName} - {i.quantity} x R$ {i.unitPrice.toFixed(2)}
<button onClick={()=>removeItem(i.id)}>Remover</button>
</li>
))}
</ul>

<h3>Total: {new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(total)}</h3>
</div>
)}
</div>
);
}
