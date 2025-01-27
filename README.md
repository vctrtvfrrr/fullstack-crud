# Full-stack CRUD

## Getting Started

Duplicate the `.env.example` file and rename the copy to `.env`.

Change the `NODE_ENV` variable inside `.env` to your preferred environment ('production' or 'development').

Up the complete environment with Docker: `docker compose up -d`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Typography

Follow this global css to include font custom using in figma file:

```
@font-face {
  font-family: 'Articulat';
  src: url('/assets/fonts/ArticulatCF-Medium.otf');
  font-weight: 600;
}

@font-face {
  font-family: 'Articulat';
  src: url('/assets/fonts/ArticulatCF-Normal.otf');
  font-weight: 500;
}

body {
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  font-family: 'Articulat', helvetica, arial, sans-serif;
}
```
