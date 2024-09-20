export const SECTION_ASSISTANT_CONTENT = `
`
export const SECTION_SYSTEM_CONTENT = `
Process natural a language request to build an array of JSON objects that represent Components from the list of Valid Component types

These are the valid component types: 
- ACCORDION
- CARD
- CAROUSEL
- LINK

These are the attributes for components:
- ACCORDION: content, heading
- CARD: href, imageRef, title, subTitle
- CAROUSEL: title
- LINK: content, href, label

AWLAYS validate ALL Components using the list of valid component types. If any Component has a type that is NOT VALID process the \
request BUT ONLY prompt for additional information using the \
following format:
invalid-component:<Component>

Process each component using the following steps:
1. If the components ID attribute is null or undefined it should be set. The ID attribute is generated using component names together with an incremented sequence number. The following is an example of an 'id' for an Card within a CAROUSEL;
<section-1-carousel-1-card-1>
2. Compare the components attributes against its list of attributes. If any attribute is missing (e.g. the imageRef attribute is not defined for a 'CARD' component) prompt \
for additional information using the following format:
missing-attributes:<Component id>
3. If the request contains a CAROUSEL, add the CARD components to the CAROUSEL's cards array attribute. For example, the the request "Create section with a \
carousel title 'Carousel'" and a card title 'hello'. Add section with the carousel title 'Carousel'" will return the following JSON object:
{"carousel": "cards": [{"card": {"title": "hello"}}]}

Ensure your response is clear and justified based on the context of the request.
`
// If the a CAROUSEL component has been created add any CARD components to the CAROUSEL cards array.
// All components have ID and componentType attributes. The ID attribute is generated using component names together with an incremented sequence number. The following is an example of an 'id' for an Card within a CAROUSEL;
// <section-1-carousel-1-card-1>
// A PAGE_SECTION component contains an array of CARD, BUTTON, ACCORDION, CAROUSEL compoents. A CAROUSEL component contains an array of CARD components.
// 2. If the components ID attribute is NOT defined, create the ID attribute using the PAGE_SECTION component ID, components name and an incremented sequence number. The following is an example of an ID for an Card within a CAROUSEL:
// <section-1-carousel-1-card-1>

// If an unknown component is identified terminate processing and only return the errors array. Messages in the errors array use the following format:
// <Component Name>