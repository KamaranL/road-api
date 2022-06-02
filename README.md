# road-api (Read-Only Active Directory API)

A super-simple, Node.js backend application built with the Express framework that returns Active Directory objects and attributes. This application relies heavily on the [activedirectory2](https://www.npmjs.com/package/activedirectory2) package.

## Installation

1. Clone repository to desired location.

    * If using a front-end framework, you can serve an "index.html" document by placing it in the root of the project folder.

2. Rename the ".env.sample" file to ".env" and edit the configuration to your liking.

3. Explicitly from the command line:

      1. Navigate to the root of the project folder.

      2. Install dependancies by running `npm install`

      3. Launch the application with `npm run [dev|prod]`

## Configuration

The following variables in the .env file are required to connect to your domain.

```env
[.env]

AD2_HOST="DC.domain.com"    # fully qualified domain name or ip address of domain controller
AD2_BASE="dc=domain,dc=com" # base scope for searching the domain
AD2_USER="user@domain.com"  # username of the binding user that is connecting to the domain
AD2_PASS="<user_password>"  # password of the binding user that is connecting to the domain
```

### LDAPS

The following variables in the .env file allow you to connect via ldaps so that data is encrypted when communicating with the domain controller.

```env
[.env]

AD2_TLS=false                           # once set to true, the ActiveDirectory connector will use the following TLS cert options
AD2_TLS_CERT="/path/to/server-cert.pem" # base-64 certificate file for the domain controller
AD2_TLS_KEY="/path/to/server-key.pem"   # base-64 key file that pairs with the domain controller certificate
AD2_TLS_CA="/path/to/ca-cert.pem"       # base-64 certificate file for the CA that signed the domain controllers certificate
AD2_TLS_ENFORCE=true                    # if CA is not specified, reject TLS connection if CA is not found in local cert store
```

## Endpoints

```text
+--/api
|
|  +--/user => returns all users
|
|     +--/<samaccountname> => returns all attributes for the specified user
|
|     +--/<samaccountname>.<attribute> => returns the specified attribute of the specified user
|
|     +--/_query.<ldap_query> => returns all users found from the provided ldap query
|
|  +--/groups => returns all groups
|
|     +--/<cn> => returns the specified group
|
|     +--/<cn>.<attribute> => returns the specified attribute of the specified group
|
|     +--/_query.<ldap_query> => returns all groups found from the provided ldap query
|
|  +--/contacts => returns all contacts
|
|     +--/<cn> => returns the specified contact
|
|     +--/<cn>.<attribute> => returns the specified attribute of the specified contact
|
|     +--/_query.<ldap_query> => returns all contacts found from the provided ldap query
|
|  +--/computers => returns all computers
|
|     +--/<cn> => returns the specified computer
|
|     +--/<cn>.<attribute> => returns the specified attribute of the specified computer
|
|     +--/_query.<ldap_query> => returns all computers found from the provided ldap query
```
