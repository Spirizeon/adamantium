'use client';
import axios from 'axios';
import React from 'react';

const randomText = `Understanding Malware Analysis: Unveiling the Shadows of Cyber Threats
In the ever-evolving landscape of cybersecurity, malware analysis stands as a critical pillar in safeguarding digital environments. This intricate process involves dissecting malicious software to comprehend its structure, functionality, and potential impact on systems. At its core, malware analysis aims to uncover how malware operates, how it spreads, and what damage it can inflict, ultimately equipping security professionals with the knowledge to defend against these threats.

The analysis process typically begins with static analysis, where security experts examine the malware’s code without executing it. This stage often involves scrutinizing file headers, metadata, and strings within the code to identify suspicious patterns or known signatures. Static analysis provides initial insights but may not reveal the full extent of the malware's behavior, as many modern threats employ obfuscation techniques to evade detection.

To gain a deeper understanding, analysts proceed to dynamic analysis. Here, the malware is executed in a controlled environment, such as a sandbox or virtual machine, allowing experts to observe its behavior in real-time. This stage reveals how the malware interacts with the system, including file modifications, network communications, and registry changes. By monitoring these activities, analysts can identify the malware's objectives and potential attack vectors.

A crucial aspect of malware analysis is behavioral analysis, which focuses on the malware's impact on system performance and user experience. Analysts track anomalies such as unexpected system slowdowns, unauthorized access attempts, or unusual network traffic. These observations help in crafting effective remediation strategies and improving detection mechanisms.

Moreover, reverse engineering plays a significant role in malware analysis. This process involves deconstructing the malware to understand its underlying logic and functionality. Reverse engineering can be complex and time-consuming, but it provides invaluable insights into the malware's design, allowing for the development of targeted defensive measures and patches.

As malware continues to evolve, incorporating advanced techniques such as machine learning and artificial intelligence into malware analysis is becoming increasingly important. These technologies enhance the ability to detect and analyze novel threats, offering a proactive approach to cybersecurity.

In essence, malware analysis is a dynamic and multifaceted discipline that combines technical expertise with innovative approaches to stay ahead of cybercriminals. By understanding the inner workings of malware, security professionals can better protect systems, respond to incidents more effectively, and contribute to the broader effort of securing the digital world.`;

const DownloadButton: React.FC = () => {
  const handleDownload = async () => {
    try {
      console.log('before API call');

      const response = await axios.post('/api/generate-pdf', {
        variableName: randomText
      }, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        // Create a URL for the PDF Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      } else {
        console.error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('An error occurred while generating the PDF', error);
    }
  };


  return (
    <button
      onClick={handleDownload}
      className="px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none sm:mx-2"
    >
      Download
    </button>
  );
};

export default DownloadButton;
