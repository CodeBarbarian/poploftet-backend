<#
    The URI where the resource is located.
#>
$URI = "http://localhost:80/api/v1/vinyl"

<#
    Access Token
#>
$Token = "VALID_ACCESS_TOKEN"

<#
    Header containing the Authorization bearer (Oauth2.0)
#>
$Headers = @{
    Authorization="Bearer $Token"
}

<#
    Send the Rest Method
#>
Invoke-RestMethod -Method GET -Uri $URI -Headers $Headers