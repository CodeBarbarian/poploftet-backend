<#
    The URI where the resource is located.
#>
$URI = "http://localhost:4000/api/v1/user/login"

<#
    The body, in this example it contains the Username and password we would like to authenticate with
#>
$Body = @{
    username="example"
    password="example"
}

<#
    Send the Rest Method
#>
$Data = Invoke-RestMethod -Method POST -Uri $URI -Body $Body

<#
    Display Access Token
#>
$Data.accesstoken

<#
    Display refreshtoken
#>
$Data.refreshtoken