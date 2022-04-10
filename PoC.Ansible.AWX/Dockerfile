FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine AS base
WORKDIR /app

#######################################################
# Add dependencies for Gdip in the runtime application. System.Drawing. 
#######################################################

# RUN apt-get update \
#     && apt-get install -y --allow-unauthenticated \
#     libc6-dev \
#     libgdiplus \
#     libx11-dev \
#     && rm -rf /var/lib/apt/lists/*


RUN apk update \
    apk add bash krb5-libs libgcc libintl libssl1.1 libstdc++ zlib

#   apk add libgdiplus --repository https://dl-3.alpinelinux.org/alpine/edge/testing/
# Ref https://docs.microsoft.com/en-us/dotnet/core/install/linux-alpine
############################### END of Gdip dependencies

EXPOSE 5001
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

WORKDIR /src
COPY ["PoC.Ansible.AWX/PoC.Ansible.AWX.csproj", "PoC.Ansible.AWX/"]
RUN dotnet restore "PoC.Ansible.AWX/PoC.Ansible.AWX.csproj"
COPY . .
WORKDIR "/src/PoC.Ansible.AWX"
RUN dotnet build "PoC.Ansible.AWX.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "PoC.Ansible.AWX.csproj" -c Release -o /app

FROM base AS final
# https://www.abhith.net/blog/docker-sql-error-on-aspnet-core-alpine/
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
RUN apk add --no-cache icu-libs

RUN apk add libgdiplus-dev fontconfig ttf-dejavu --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ --allow-untrusted



WORKDIR /app
COPY --from=publish /app .
# ENV ASPNETCORE_URLS=http://+:5001

COPY Docker/acid-dev-cert.pfx .
ENV ASPNETCORE_URLS=https://+:443;http://+:5001
ENV ASPNETCORE_HTTPS_PORT=443

ENV ASPNETCORE_Kestrel__Certificates__Default__Password="123456"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=./acid-dev-cert.pfx



ENTRYPOINT ["dotnet", "PoC.Ansible.AWX.dll"]