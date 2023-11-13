const express=require('express')
const {urlModal}=require('./url.model')
const urlRouter=express.Router()
const shortid = require('shortid');
urlRouter.post('/shorten', async (req, res) => {
  try {
    const { originalUrl, customUrl, expirationTime } = req.body;
    const shortUrl = customUrl || shortid.generate();
    const existingUrl = await urlModal.findOne({ shortUrl });
    if (existingUrl) {
      return res.status(400).json({ error: 'Custom URL already exists' });
    }
    const url = new urlModal({
      originalUrl,
      shortUrl,
      expirationTime,
    });
    await url.save();
    res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}`, shortid:shortUrl });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });
  urlRouter.get('/geturl/:shortUrl', async (req, res) => {
    try {
      const { shortUrl,shortid } = req.params;
      console.log(1,shortUrl)
      const url = await urlModal.findOne({ shortUrl:shortUrl });
      console.log(2,url)
      if (!url) {
        return res.status(404).json({ error: 'Short URL not found' });
      }
  
      if (url.expirationTime > 0) {
        const currentTime = Date.now();
        const expirationTime = new Date(url.createdAt).getTime() + url.expirationTime * 60 * 1000;
  
        if (currentTime > expirationTime) {
          return res.status(404).json({ error: 'Short URL has expired' });
        }
      }
  
      //res.redirect(url.originalUrl);
      res.status(200).send({ url: `${url.originalUrl}` })
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports={urlRouter}