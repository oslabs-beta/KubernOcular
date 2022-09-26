# KubernOcular

## Set Up

1. Clone this repository onto your local machine
        
        git clone https://github.com/oslabs-beta/KubernOcular.git
        
2. Install helm using the appropriate terminal commands

    For MacOS/Homebrew:
        
        brew install helm
        
    
    For Windows/Chocolatey:
        
        choco install kubernetes-helm
        
    
    For Linux/Ubuntu:

        curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
        
        sudo apt-get install apt-transport-https --yes
  
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list

        sudo apt-get install helm

3. Once helm is properly installed, add the helm-charts repository

        helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

4. Install the kube-prometheus-stack manifests collection with this command in your terminal

        helm install --set prometheus-node-exporter.hostRootFsMount.enabled=false prometheus prometheus-community/kube-prometheus-stack

5. Port-forward the prometheus api to http://localhost:9090

        kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9090

6. Visit http://localhost:8080 to begin your KubernOcular experience

7. When you are finished using KubernOcular, uninstall the prometheus monitoring stack - this should also delete the prometheus running cluster

        helm uninstall prometheus

## Technologies

* [React](https://reactjs.org/)
* [Webpack](https://webpack.js.org/)
* [React Router](https://reactrouter.com/en/main)
* [TypeScript](https://www.typescriptlang.org/)
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Kubernetes-Client](https://www.npmjs.com/package/kubernetes-client)
* [Prometheus/PromQL](https://prometheus.io/)
* [Chart.js](https://www.chartjs.org/)
* [Material UI](https://mui.com/)
* [Jest](https://jestjs.io/)
* [Puppeteer](https://pptr.dev/)
* [Supertest](https://www.npmjs.com/package/supertest)

## The KubernOcular Team

* Adam Selph: [Github](https://github.com/ARSelph) | [LinkedIn](https://www.linkedin.com/in/adam-selph-93231324a/)
* Shirley Luu: [Github](https://github.com/shirley-luu) | [LinkedIn](https://www.linkedin.com/in/luu-shirley/)
* Brian Preston: [Github](https://github.com/BrianJPreston) | [LinkedIn](https://www.linkedin.com/in/brian-preston-33444430/)
* Evan Emenegger: [Github](https://github.com/emenegger) | [LinkedIn](https://www.linkedin.com/in/evan-emenegger/)
* Michael Mezhiritskiy: [Github](https://github.com/MichaelMezhiritskiy) | [LinkedIn](https://www.linkedin.com/in/michael-mezhiritskiy-41a0aa1b4/)
