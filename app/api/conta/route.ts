import {NextResponse} from "next/server";
// Ponto de integração seguro: somente dados de uma sessão validada no servidor
// poderão ser retornados quando a autenticação for conectada.
// O Eduverso atual oferece acesso demonstrativo, sem login ou dados de compradores.
export const dynamic="force-dynamic";
export async function GET(){
 return NextResponse.json({user:null,authenticated:false},{headers:{"Cache-Control":"private, no-store, max-age=0"}});
}
