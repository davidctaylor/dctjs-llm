# LLM project

This project uses a Large Language Model to create JSON objects that can then be used to build web pages.

## Objectives

- Allow none technical users to create web content using natural language
- Web pages dynamically built from JSON objects that describe page components and content
- Support a set of well known components e.g. Cards, Carousel or Accordions
- Allow editing or modification of JSON obects

## Example usage

The following is an example of user interactions that will display a web page with main content and two sections. The first will display a Carousel of images the second accordions with frequently asked questions

```
As expert on Colorado state parks, create an article of no more that 500 words with a paragraph for each of the parks
'Mesa Verde', 'Great Sand Dunes' and the 'Rocky Mountain National Park' with the title 'Colorful Colorado State parks'. 
Style your response using Markdown
```

```
Create a section with a Carousel, the title of the Carousel is "Image gallery of Colorado State Parks". Add a Card with 
the image url "/images/mesa-verde.jpg". Add an Card with the image url "/images/great-sand-dunes.jpg". Add an Card with 
the image url "/images/garden.jpg"
```

```
Create a new section with the heading "Frequently asked questions". As an expert on Colorado state parks generate three common 
questions and answers for visitors to the Mesa Verde state park. Use these to create Accordions with the question in the 
accordion 'heading' and the answer in accordion content' Add a CTA with the label "click me!" and the href "http://123.com"
```

![Alt text](https://github.com/davidctaylor/dctjs-llm/example-result.png "Example of generated page")

## Start the application

Install

`npm install`

Obtain on OpenAi API key and export its value

`export OPENAI_API_KEY=my=key`

Start the applicaltion

`npm run start`

