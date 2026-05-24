# Jurassic Explorer Encyclopedia

A Jurassic field-guide style mini app for scouting, sorting, saving, and comparing Mesozoic giants.

## Overview

**Project title:** Jurassic Explorer Encyclopedia

**Status:** Field Ready  
**Build:** Vanilla JS  
**Theme:** Jurassic Field Guide

Jurassic Explorer Encyclopedia is a digital **field guide** where users browse dinosaur specimen cards, filter by classification, save favorites like a field log, and compare two dinosaurs at a research station.

The app is designed for fast dinosaur discovery: users can search instantly, filter by period, diet, and size, sort results by name or length, and compare two dinosaurs side-by-side without a page refresh.

## Problem

Most dinosaur information pages are either **too text-heavy** or **hard to browse quickly**, especially when users want to compare dinosaurs side-by-side.

This project solves the “I want to quickly find and compare dinosaurs” problem by building a fast, visual, field-guide interface that lets users:

- Search instantly
- Filter by period, diet, and size
- Sort by name or length
- Save favorites like a field log
- Compare two dinosaurs in a field station panel

## Goals

- Make dinosaur discovery **fast and intuitive** through a field guide browsing style
- Keep the UI **consistent and Jurassic-themed**
- Make filtering and sorting feel smooth and immediate
- Persist favorites so users can return to saved specimens

### Measurable outcomes

- Search updates within a **~150ms debounce**, so it feels instant
- Filter and sort run client-side with **no page refresh**
- Favorites persist across refresh using **localStorage**
- Card layout stays consistent using **locked sizing and silhouette watermark styling**
- Compare panel updates instantly once two dinosaurs are selected

## Stack

- **HTML5** — semantic structure for controls, panels, and cards
- **CSS3** — responsive grid, themed UI, and consistent specimen layouts
- **JavaScript ES6 / Vanilla JavaScript** — rendering, filtering, sorting, favorites, and compare logic
- **JSON** — structured dinosaur dataset through `dinosaurs.json`
- **localStorage** — persistent favorites / field log

## Image and data credit

Dinosaur images and data were sourced from:

- Natural History Museum UK: https://www.nhm.ac.uk/
- Jurassic Quest: https://www.jurassicquest.com/

## Experience flow

The app follows a simple field-guide flow:

```txt
Search + filters → Compare station → Specimen cards