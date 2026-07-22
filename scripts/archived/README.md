# PDF conversion scripts

Documents are originally PDFs, but with hundreds of moves and pokemon it's impossible to transfer it all into structured data by hand. Therefore, **automation**!

The scripts in this folder were used to convert the PDFs into JSON. They were expected to only ever be run once, so the code is not as maintainable as it can be.

The process is not _fully_ automated.

1. [pdf2html](https://www.npmjs.com/package/pdf2html) is used to convert the pdf to a text file.
2. The text file is manually edited to strip away unnecessary clutter like cover pages and stuff to make the conversion code easier to write
3. The conversion code is ran.
