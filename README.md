# road-api (Read Only Active Directory API)

A simple, backend application built on Node.js with the Express framework that returns Active Directory attributes from
the requests made to the endpoints. This app relies heavily on the [activedirectory2](https://www.npmjs.com/package/activedirectory2)
package.

## Configuration

The following variables in the .env file are required to connect to your domain.

```text

AD2_HOST="DC.domain.com"
AD2_BASE="dc=domain,dc=com"
AD2_USER="user@domain.com"
AD2_PASS="<user_password>"

```

### Endpoints

```text

/api
  /users - returns all users
    /<samaccountname> - returns the provided user
    /<samaccountname>.memberOf - returns all groups the provided user is a member of
    /_query.<query> - returns all users with the provided ldap search query
  /groups - returns all groups
    /<cn> - returns the provided group
    /<cn>.member - returns all members of the provided group
    /_query.<query> - returns all users with the provided ldap search query

```
