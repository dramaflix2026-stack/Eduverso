
import type {MetadataRoute} from "next";
import {site} from "./seo/catalog";
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:"*",allow:"/",disallow:["/api/","/plataforma","/acesso-pendente"]},sitemap:site+"/sitemap.xml"}}
