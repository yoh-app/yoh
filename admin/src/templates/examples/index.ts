import banner_1 from './01_banner/banner_1.json'
import banner_2 from './01_banner/banner_2.json'
import banner_3 from './01_banner/banner_3.json'
import article_1 from './02_article/article_1.json'
import article_2 from './02_article/article_2.json'
import article_3 from './02_article/article_3.json'
import artible_list_1 from './03_article_list/article_list_1.json'
import artible_list_2 from './03_article_list/article_list_2.json'
import artible_list_3 from './03_article_list/article_list_3.json'
import artible_list_4 from './03_article_list/article_list_4.json'
import artible_list_5 from './03_article_list/article_list_5.json'
import cta_1 from './04_cta/cta_1.json'
import cta_2 from './04_cta/cta_2.json'
import gallery_1 from './05_gallery/gallery_1.json'
import gallery_2 from './05_gallery/gallery_2.json'
import features_1 from './06_features/features_1.json'
import features_2 from './06_features/features_2.json'
import team_1 from './07_team/team_1.json'
import team_2 from './07_team/team_2.json'
import team_3 from './07_team/team_3.json'
import team_4 from './07_team/team_4.json'
import FAQ_1 from './08_FAQ/FAQ_1.json'
import full_width_image from './09_element/full_width image.json'
import heading from './09_element/heading.json'
import paragraph from './09_element/paragraph.json'

const banner_sections = [banner_1, banner_2, banner_3]
const article_sections = [article_1, article_2, article_3]
const article_list_sections = [artible_list_1, artible_list_2, artible_list_3, artible_list_4, artible_list_5]
const cta_sections = [cta_1, cta_2]
const gallery_sections = [gallery_1, gallery_2]
const features_sections = [features_1, features_2]
const team_sections = [team_1, team_2, team_3, team_4]
const faq_sections = [FAQ_1]
const element_sections = [full_width_image, heading, paragraph]

// const createDefaultTemplate = () => {
//   const websiteMenu = {
//     cards: [],
//     columns: [],
//     columnOrder: []
//   }
// }


const organizePage = (sections) => {
  const page = {
    "ROOT": { "id": "ROOT", "type": "Root", "displayName": "Root", "props": {}, "custom": {}, "parent": null, "nodes": [], "linkedNodes": {}, "hidden": false, "isCanvas": true }
  }
  sections.forEach(section => {
    const sectionId = section.ROOT.nodes[0]
    page.ROOT.nodes.push(sectionId)

    Object.keys(section).forEach((nodeId) => {
      if (nodeId !== 'ROOT') {
        page[nodeId] = section[nodeId]
      }
    })
  });
  return page
}

export const bannerPage = organizePage(banner_sections)
export const articlePage = organizePage(article_sections)
export const articleListPage = organizePage(article_list_sections)
export const ctaPage = organizePage(cta_sections)
export const galleryPage = organizePage(gallery_sections)
export const featurePage = organizePage(features_sections)
export const teamPage = organizePage(team_sections)
export const faqPage = organizePage(faq_sections)
export const elementPage = organizePage(element_sections)