jQuery(document).ready(function ($) {

    const searchConfig = {
        "resultsPage": decodeURIComponent(cmw_jobs_json.results_page),
        "resultsElement": "#resultsList",
        "searchForm": "#cmwSearchForm",
        "filterLink": ".cmw-search-filter",
        "resultsMeta": "#resultsMeta",
        "resultsCounter": "#resultsCount",
        "resultsCounterText": "#resultsCountMessage",
        "resultsMessages": "#resultsFilterMessages",
        "resultsActiveFilter": "#resultsActiveFilter",
    }
    
    var paramDepartment = getUrlParameter('dept');
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
        asyncJobSearch( searchConfig,paramSearch );
    }


    // bind search action to search form submit
    $(searchConfig.searchForm).on("submit", function(e){
        e.preventDefault();
        var searchDetails;
        var searchDetails = {
            "keyword": $(this).find("#cmwSearchKeyword").val(),
            "department": $(this).find("#cmwSearchDepartment").val(),
            "location": $(this).find("#cmwSearchLocation").val(),
        }
        console.log(searchDetails);
        routeSearch(searchConfig,searchDetails);
    });
    $(searchConfig.filterLink).on("click", function(e){
        e.preventDefault();
        console.log('filter click');
        $search = $(this).data('search').toString();
        $type = $(this).data('type');
        $label = $(this).data('search-label');
        if ($search && $type && $label){
            var searchDetails = buildSearchDetails($search,$type,$label);
            console.log(searchDetails);
            routeSearch(searchConfig,searchDetails);
            $(".cmw-search-filter.active").removeClass("active");
            $(this).addClass("active");
        } else {
            console.warn("Not a filter link....");
        }

    });

    
    /*
    *
    *  determine desired search behavior by configuration
    * 
    */
    function routeSearch(searchConfig,searchDetails){
        if ( window.location.href === searchConfig.resultsPage ){
            // init search on the results page
            asyncJobSearch( searchConfig,searchDetails );
            console.log("Async search.");   
        } else{
            // init search from other page
            var redirect = searchConfig.resultsPage;
            console.log("Redirect search: "+redirect);
            redirectSearch(redirect, searchDetails);
        }
    }


    function asyncJobSearch(searchConfig, searchDetails){
        // prepare activeFilterMessage values;
        var activeFilterMessage = "";
        searchDetails.keyword.trim() != '' ?  activeFilterMessage += "keyword: '"+searchDetails.keyword.trim()+"'" :  activeFilterMessage += "any position" ; 
        searchDetails.department.trim() != '' ?  activeFilterMessage += " in "+searchDetails.search_display : activeFilterMessage += " in any department" ; 
        searchDetails.location != '' ?  activeFilterMessage += ", located in "+searchDetails.search_display : activeFilterMessage += ", located anywhere" ; 

        // must use keyword serch if keyword present or both location and department filters are present 
        if ( searchDetails.keyword.trim() != '' ||  ( searchDetails.department.trim() != '' && searchDetails.location.trim() != '' ) ){
            // combine the search values into a string - keywordSearch() will search on all available fields
            var asyncSearch = keywordSearch(searchDetails.keyword.trim() +" "+ searchDetails.location.trim()+" "+searchDetails.department.trim() );

        } else if ( searchDetails.department.trim() != ''){
            // department
            var asyncSearch = departmentSearch(searchDetails.department.trim());
            
        } else if ( searchDetails.paramLocation != ''){
            // location
            var asyncSearch = locationSearch(searchDetails.location);

        } else {
            var asyncSearch = [];
            console.warn("how did we get here? THERES A BUG IN THE MATRIX");
        }

        renderSearchResults(asyncSearch, searchConfig, activeFilterMessage);                 

            
    }

    function getConfiguredSearchOptions(searchKeys){
        var options = {
            shouldSort: true,
            findAllMatches: true,
            includeScore: true,
            threshold: 0.4,
            location: 0,
            distance: 1000,
            maxPatternLength: 32,
            keys: searchKeys,
            id: 'tuid'
        };
        return options;
    }

    function keywordSearch(searchTerm){
        //when searching by keyword and/or location and/or department
        var jobs_list = cmw_jobs_json.cache_data;
        var keys = [
            {name: 'title', weight: 0.8}, 
            {name: 'keywords', weight: 0.1},
            {name: 'location', weight: 0.5}, 
            {name: 'department', weight: 0.5}, 
        ];
        var options = getConfiguredSearchOptions(keys);

        return runFuseSearch(jobs_list,options,searchTerm);
    }

    function departmentSearch(searchTerm){
        // when searching by department only
        var jobs_list = cmw_jobs_json.cache_data;
        var keys = ['department'];
        var options = getConfiguredSearchOptions(keys);
        
        return runFuseSearch(jobs_list,options,searchTerm);
    }

    function locationSearch(searchTerm){
        // when searching by location only
        var jobs_list = cmw_jobs_json.cache_data;
        var keys = ['location'];
        //var options = getConfiguredSearchOptions(keys);
        var options = {
            shouldSort: true,
            findAllMatches: true,
            includeScore: true,
            threshold: 0.1,
            location: 0,
            distance: 1000,
            maxPatternLength: 32,
            keys: keys,
            id: 'tuid'
        };
        
        return runFuseSearch(jobs_list,options,searchTerm);
    }

    function runFuseSearch(list,options,search){
        var fuse = new Fuse(list, options); // "list" is the item array
        if ( fuse ) {
            return fuse.search(search);
        } else {
            console.warn("Search failed to initiate.");
            return false;
        }
    }

    function resetSearchResults(resultsTarget){
        resultsTarget.children("li").each(function(){
            $(this).attr("data-sort", "").attr("data-show", "").show();
        });
    }
    function renderSearchResults(asyncSearch, searchConfig, activeFilterMessage){
        // dom elements to update
        var resultsTarget = $( searchConfig.resultsElement );
        var resultsCounter = $( searchConfig.resultsCounter );
        var resultsCounterText = $( searchConfig.resultsCounterText );
        var resultsActiveFilter = $( searchConfig.resultsActiveFilter );

        if ( resultsTarget ){
            resetSearchResults( resultsTarget );
            resetProgressBar();
            if ( asyncSearch ){
                // trigger the progress bar animation
                runProgressBar();
                //update search meta
                if ( resultsCounter && resultsCounterText ){
                    resultsCounter.html(asyncSearch.length);
                    resultsCounterText.html(" positions matched your search criteria:");
                }
                if ( resultsActiveFilter ){
                    resultsActiveFilter.html(activeFilterMessage);
                }

                // prepare an array of UIDs of jobs that match search
                var displayedJobs = [];
                for (var i = 0, len = asyncSearch.length; i < len; i++) {
                    displayedJobs.push(asyncSearch[i].item);
                }

                // prepare the data-sort increment for non-matches
                var hiddenOrder = displayedJobs.length;
                
                // loop the list, add the data-sort attr, hide non-matches and increment the hidden counter
                resultsTarget.children("li").each(function(){
                    var $this = $(this);
                    var uid = $this.attr("id");
                    $this.hide();
                    if ( displayedJobs.includes( uid ) ){
                        var index = displayedJobs.indexOf( uid );
                        $this.attr("data-sort", index).attr("data-show", true);
                    } else {
                        var ele = $this.detach().attr("data-sort", hiddenOrder);
                        resultsTarget.append(ele);
                        hiddenOrder++;
                    }
                });
                
                // use data-sort to sort the results
                $(searchConfig.resultsElement +" li").sort(sort_li).appendTo(searchConfig.resultsElement );
                function sort_li(a, b) {
                    return ( $(b).data('sort') ) < ( $(a).data('sort') ) ? 1 : -1;
                }

                // animated reveal of the sorted results
                var d = 0;
                $(searchConfig.resultsElement +" li").each(function(i){
                    var $li = $(this);
                    if ( $li.attr("data-show") ){
                        $li.delay(100 * d).slideDown(500);
                        d++;
                    }
                });              

            } else {
                console.warn("No matches or bad search");
            }

        } else {
            console.warn("... but where to put you?");
            //list not found
            //can't apply search
        }
        
    }
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
    function runProgressBar() {
        var getPercent = 1;
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 1500;
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
    function resetProgressBar() {
        $('.progress-bar').css({"left":"0"});
        $('.progress').css({"opacity":"1"});
    };

    function redirectSearch(location, urlSearch){
        var args = urlSearch;
        // build the url
        var redirect = location+"?";
        urlSearch.keyword ? redirect += "find="+encodeURIComponent(urlSearch.keyword)+"&" : "";
        urlSearch.department ? redirect += "dept="+encodeURIComponent(urlSearch.department)+"&" : "";
        urlSearch.location ? redirect += "loc="+encodeURIComponent(urlSearch.location)  : "";
        // clean any trailing &
        if (redirect.substring(redirect.length-1) == "&"){
            redirect = redirect.substring(0, redirect.length-1);
        }

        //console.log(urlSearch);
        //console.log(redirect);
        //perform the redirect
        window.location = redirect;
            
    };
    function buildSearchDetails(search,type,label = ''){
        var searchDetails = {
            "keyword": "",
            "department": "",
            "location": "",
            "search_display": label,
        }
        switch (type){
            case 'location':
                searchDetails.location = search;
                return searchDetails;
                break;
            case 'department':
                searchDetails.department = search;
                return searchDetails;
                break;
            case 'keyword':
                searchDetails.keyword = search;            
                return searchDetails;
                break;
        }
    }
    // fin


});