
function SearchConfig($) {
    SearchConfig.prototype.resultsPage = decodeURIComponent(cmw_jobs_json.results_page);
    SearchConfig.prototype.resultsElement = "#resultsList";
    SearchConfig.prototype.resultsMaxHeight = $(this.resultsElement).height();
    SearchConfig.prototype.searchForm = "#cmwSearchForm";
    SearchConfig.prototype.filterEle = ".cmw-search-filter";
    SearchConfig.prototype.resultsMeta = "#resultsMeta";
    SearchConfig.prototype.resultsCounter = "#resultsCount";
    SearchConfig.prototype.resultsCounterText = "#resultsCountMessage";
    SearchConfig.prototype.resultsMessages = "#resultsFilterMessages";
    SearchConfig.prototype.resultsActiveFilter = "#resultsActiveFilter";
    SearchConfig.prototype.resultsLoadingSpinner = "#cmwLoading";
    SearchConfig.prototype.options = {
        shouldSort: true,
        findAllMatches: true,
        includeScore: true,
        threshold: 0.4,
        location: 0,
        distance: 1000,
        maxPatternLength: 32,
        keys: [],
        id: 'tuid'
    };
    if ( window.location.href === this.resultsPage ){
        SearchConfig.prototype.searchType = "asynchronous";
    } else {
        SearchConfig.prototype.searchType = "synchronous";
    }

    //$(this.resultsElement).css({"height":this.resultsMaxHeight});
    //console.log(this.resultsMaxHeight);
};

function Search($,config,searchKey) {
    Search.prototype.searchConfig = config;
    Search.prototype.jobsList = cmw_jobs_json.cache_data;
    Search.prototype.searchKey = searchKey;
    Search.prototype.filterMeta = "";

    Search.prototype.resetSearchKey = function(search){
        this.searchKey = search;
    };
    Search.prototype.filterLocations = function(){
        this.setOptionKeys([
            {name: 'location', weight: 0.9}, 
        ]);
        this.setOptionThreshold(0.1);
        if (this.results != undefined && this.results.length > 0){

            this.rerunSearch(this.searchKey);
        } else {
            this.runSearch(this.searchKey);

        }
        
    };
    Search.prototype.filterDepartments = function(){
        this.setOptionKeys([
            {name: 'department', weight: 0.9}, 
        ]);
        this.setOptionThreshold(0.1);
        if (this.results != undefined && this.results.length > 0){

            console.log("rerun...");
            this.rerunSearch(this.searchKey);
        } else {
            console.log("init search...");
            this.runSearch(this.searchKey);

        }
    };
    Search.prototype.setOptionKeys = function(keys){
        if (keys.length > 0){
            this.searchConfig.options.keys = keys;
        } else {
            this.searchConfig.options.keys = [
                {name: 'title', weight: 0.7}, 
                {name: 'keywords', weight: 0.2},
            ];
        }
    };
    Search.prototype.setOptionThreshold = function(threshold){
        this.searchConfig.options.threshold = threshold; 
    };
    Search.prototype.runSearch = function(){
        var fuse = new Fuse(this.jobsList, this.searchConfig.options); // "list" is the item array
        if ( fuse ) {
            this.results = fuse.search(this.searchKey);
            return true;
        } else {
            console.warn("Search failed to initiate.");
        return false;
        }
    };
    Search.prototype.rerunSearch = function(){
        var fuseRerun = new Fuse(this.jobsList, this.searchConfig.options); // "list" is the item array
        if ( fuseRerun ) {
            this.rerunResults = fuseRerun.search(this.searchKey);
            if (this.rerunResults != undefined){
                //console.log("reran search:");
                //console.log(this.rerunResults.length);
                //console.log("now comb these out and reset to results for display/rerun");
                this.results = this.symmetricDifference();
                //console.log(this.results.length);
                //console.log(this.results);
                console.log("rerun done");
                
            }
            return true;
        } else {
            console.warn("Search failed to initiate.");
        return false;
        }
    };

    Search.prototype.symmetricDifference = function() {
        var matches = [], maxLength = 0, setA = [], setB = [];
        for (var i = 0, len = this.results.length; i < len; i++){
            //console.log(this.results[i].item);
            setA.push(this.results[i].item);
        }
        console.log("set a: "+ setA.length);
        for (var i = 0, len = this.rerunResults.length; i < len; i++){
            //console.log(this.rerunResults[i].item);
            setB.push(this.rerunResults[i].item);
        }
        console.log("set b: "+ setB.length);
        if (setA.length > setB.length){
            console.log("set A is bigger...");
            for (var i = 0, len = setA.length; i < len; i++){
                if (setB.indexOf(setA[i]) >= 0) {
                    //console.log("match #"+i);
                    matches.push({"item":setA[i]});
                }
            }
        } else {
            console.log("set b is bigger...");
                for (var i = 0, len = setB.length; i < len; i++){
                    if (setA.indexOf(setB[i]) >= 0) {
                        //console.log("match #"+i);
                        matches.push({"item":setB[i]});
                    }
                }
        }
        console.log("------------------------");
        console.log(matches.length);
        console.log("------------------------");
        return matches;
    };

    Search.prototype.renderSearchResults = function(){
        var resultsTarget = $(this.searchConfig.resultsElement );
        var resultsCounter = $( this.searchConfig.resultsCounter );
        var resultsCounterText = $( this.searchConfig.resultsCounterText );
        var resultsActiveFilter = $( this.searchConfig.resultsActiveFilter );
        var resultsLoadingSpinner = $( this.searchConfig.resultsLoadingSpinner );

        if (resultsTarget){
            $('html, body').animate({
                scrollTop: $(this.searchConfig.searchForm).offset().top
            }, 1000);
            // UI progress indicator animation
            this.animateProgressBar();
            // reset results
            resultsTarget.children("li").each(function(){
                $(this).attr("data-sort", 0).attr("data-show", "false");
            }); 
            // prepare the matched elements for sorting
            for (var i = 0, len = this.results.length; i < len; i++) {
                //console.log(this.results[i].item);
                if ( resultsTarget.children("#"+this.results[i].item) ){
                    resultsTarget.children("#"+this.results[i].item).attr("data-sort", i).attr("data-show", "true");
                }
            }

            // sort the ordered result elements
            $(this.searchConfig.resultsElement +" li").sort(sort_li).appendTo(this.searchConfig.resultsElement );
            function sort_li(a, b) {
                return ( $(b).data('sort') ) < ( $(a).data('sort') ) ? 1 : -1;
            }

            // animated reveal of the sorted results
            var d = 0;
            var minH = 0;
            $(this.searchConfig.resultsElement +" li").each(function(i){
                var $li = $(this);
                if ( "true" == $li.attr("data-show") ){
                    $li.delay(100 * d).slideDown(500);
                    d++;
                    minH += $li.height();
                } else {
                    //$li.hide();
                    $li.detach().hide();
                    resultsTarget.append($li);
                }
            });    
            // ensure back-to-back async searches don't shrink the results container
            resultsTarget.css({"min-height":minH});
            //console.log(minH);

            if ( resultsCounter && resultsCounterText ){
                resultsCounter.html(this.results.length);
                resultsCounterText.html(" positions matched your search:");
            }

            if ( resultsActiveFilter ){
                resultsActiveFilter.html(this.filterMeta);
            }
        }
    };

    Search.prototype.animateProgressBar = function(){
        var resultsLoadingSpinner = $( this.searchConfig.resultsLoadingSpinner );
        resultsLoadingSpinner.addClass("uk-hidden");
        var getPercent = 1;
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 1500;
        $('.progress-bar').css({"left":"0"});
        $('.progress').css({"opacity":"1"});
        // .stop() used to prevent animation queueing
        $('.progress-bar').stop().animate({
            left: progressTotal
        }, animationLength, "linear", function() {
            // progress animation complete, collapse bar.
            $('.progress').delay(300).animate({
                "opacity": "0"
            }, 250, "linear");
        });
    };

    Search.prototype.setFilterMessage = function(){
        // prepare activeFilterMessage values;
        var activeFilterMessage = "";
        //searchDetails.keyword.trim() != '' ?  activeFilterMessage += "keyword: '"+searchDetails.keyword.trim()+"'" :  activeFilterMessage += "any position" ; 
        //searchDetails.department.trim() != '' ?  activeFilterMessage += " in "+searchDetails.search_display : activeFilterMessage += " in any department" ; 
        //searchDetails.location != '' ?  activeFilterMessage += ", located in "+searchDetails.search_display : activeFilterMessage += ", located anywhere" ; 
    }

};
jQuery(document).ready(function($){
    
    console.info("Careers search ready...");
    var searchConfig = new SearchConfig($);

/*     var paramDepartment = getUrlParameter('dept');
    var paramLocation = getUrlParameter('loc');
    var paramKeyword = getUrlParameter('find');
    var paramSearch = {
        "keyword": paramKeyword ? paramKeyword : "",
        "department": paramDepartment ? paramDepartment : "",
        "location": paramLocation ? paramLocation : "",
    }

    if (paramDepartment || paramLocation || paramKeyword){
        console.log("Detected parameters:");
        if (paramDepartment) console.log("department = "+paramDepartment);
        if (paramLocation) console.log("location = "+paramLocation);
        if (paramKeyword) console.log("keyword = "+paramKeyword);
        //routeSearch(searchConfig,paramSearch);
        //asyncJobSearch( searchConfig,paramSearch );
    } */
    // search on form submit
    $(searchConfig.searchForm).on("submit", function(e){
        e.preventDefault();
        var searchDetails;
        var searchDetails = {
            "keyword": $(this).find("#cmwSearchKeyword").val(),
            "department": $(this).find("#cmwSearchDepartment").val(),
            "location": $(this).find("#cmwSearchLocation").val(),
        }
        console.log(searchDetails);
        search = new Search($,searchConfig,"");
        if (searchDetails.location != ''){
            console.log("Loc filter...");
            search.resetSearchKey(searchDetails.location);
            search.filterLocations();
            //console.log(search.results);
        }
        if (searchDetails.department != ''){
            console.log("Team filter...");
            search.resetSearchKey(searchDetails.department);
            search.filterDepartments();
            //console.log(search.results);
        }
        if (searchDetails.keyword != ''){
            console.log("Keyword search last...");
            search.resetSearchKey(searchDetails.keyword);
            var searchKeys = [
                {name: 'title', weight: 0.7}, 
                {name: 'keywords', weight: 0.2},
            ];
            search.setOptionKeys(searchKeys);
            search.setOptionThreshold(0.4);
            if (search.results != undefined){
                
                console.log("running keywords against existing results");
                search.rerunSearch();
            } else {
                console.log("no existing search, just running keywords");
                search.runSearch();

            }
        }
        search.renderSearchResults();
        search = null;

    });

    $(searchConfig.filterEle).on("click", function(e){
        e.preventDefault();
        console.info("Careers link filter clicked...");
        $(searchConfig.searchForm).find("input").val("");
        $(searchConfig.searchForm).find("select").val("");

        var type = $(this).data('type') != undefined ? $(this).data('type') : 'keyword'; // the type of search to perform
        var search = $(this).data('search').toString(); // the search value
        var label = $(this).data('search-label'); // the display label for the search value
        $(".cmw-search-filter.active").removeClass("active");
        $(this).addClass("active");
        switch (type){
            case 'location':
                search = new Search($,searchConfig,search);
                search.filterLocations();
                search.renderSearchResults();
                break;
            case 'department':
                search = new Search($,searchConfig,search);
                search.filterDepartments();
                search.renderSearchResults();
                break;
            case 'keyword':
                //search = new Search($,searchConfig,search);
                search = new Search($,searchConfig,search);
                var searchKeys = [
                    {name: 'title', weight: 0.7}, 
                    {name: 'keywords', weight: 0.2},
                ];
                search.setOptionKeys(searchKeys);
                search.setOptionThreshold(0.4);
                console.log(search.searchKey);
                search.runSearch();
                search.renderSearchResults();
                break;
        }
    });
});

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};