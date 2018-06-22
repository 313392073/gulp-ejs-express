module.exports = function (router) {
    router.get('/hello',function (req,res) {
        res.render('hello',{
            'title':'hello express',
            'content':'你好，express!!!'
        })
    })
}