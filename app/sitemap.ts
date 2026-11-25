
import type {MetadataRoute} from "next";
import {site,articles,tools} from "./seo/catalog";
export default function sitemap():MetadataRoute.Sitemap{return ["/","/blog","/ferramentas",...articles.map(x=>"/blog/"+x.slug),...tools.map(x=>"/ferramentas/"+x.slug)].map(path=>({url:site+(path==="/"?"":path)}))}
